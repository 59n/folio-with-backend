import path from 'node:path';
import { createWriteStream, promises as fs } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import type { MultipartFile } from '@fastify/multipart';
import type { PrismaClient } from '@prisma/client';
import env from '@config/env';

const attachmentsDir = env.ATTACHMENTS_DIR;

async function ensureDir() {
  await fs.mkdir(attachmentsDir, { recursive: true });
}

export async function saveAttachment(
  prisma: PrismaClient,
  postId: string,
  file: MultipartFile
) {
  await ensureDir();

  const safeName = `${Date.now()}-${file.filename.replace(/\s+/g, '_')}`;
  const diskPath = path.join(attachmentsDir, safeName);
  const writeStream = createWriteStream(diskPath);
  await pipeline(file.file, writeStream);
  const stats = await fs.stat(diskPath);

  const url = `/attachments/${safeName}`;

  const data = {
    name: file.filename,
    url,
    size: stats.size,
    mimeType: file.mimetype
  };

  const attachment = await prisma.attachment.create({
    data: postId
      ? {
          ...data,
          post: { connect: { id: postId } }
        }
      : data
  });

  if (postId) {
    await prisma.post.update({
      where: { id: postId },
      data: { hasFiles: true }
    });
  }

  return attachment;
}

export async function removeAttachment(prisma: PrismaClient, attachmentId: string) {
  const attachment = await prisma.attachment.delete({ where: { id: attachmentId } });

  const diskPath = path.join(attachmentsDir, path.basename(attachment.url));
  await fs.rm(diskPath, { force: true });

  if (attachment.postId) {
    const count = await prisma.attachment.count({ where: { postId: attachment.postId } });
    if (count === 0) {
      await prisma.post.update({
        where: { id: attachment.postId },
        data: { hasFiles: false }
      });
    }
  }

  return attachment;
}
