import { FastifyInstance } from 'fastify';
import { saveAttachment, removeAttachment } from '@services/attachmentService';

export default async function attachmentRoutes(fastify: FastifyInstance) {
  fastify.post('/api/posts/:id/attachments', { preHandler: fastify.authenticate }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const file = await request.file();

    if (!file) {
      return reply.code(400).send({ message: 'No file provided' });
    }

    const attachment = await saveAttachment(fastify.prisma, id, file);
    return reply.code(201).send(attachment);
  });

  fastify.delete('/api/attachments/:attachmentId', { preHandler: fastify.authenticate }, async (request) => {
    const { attachmentId } = request.params as { attachmentId: string };
    return removeAttachment(fastify.prisma, attachmentId);
  });
}
