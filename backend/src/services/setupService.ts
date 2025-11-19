import { PrismaClient } from '@prisma/client';
import env from '@config/env';
import logger from '@lib/logger';

export async function ensureAdminUser(prisma: PrismaClient) {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD_HASH) {
    logger.warn('ADMIN_EMAIL or ADMIN_PASSWORD_HASH missing; skipping admin bootstrap');
    return;
  }

  await prisma.user.upsert({
    where: { email: env.ADMIN_EMAIL },
    update: {
      password: env.ADMIN_PASSWORD_HASH
    },
    create: {
      email: env.ADMIN_EMAIL,
      password: env.ADMIN_PASSWORD_HASH,
      role: 'admin'
    }
  });

  logger.info({ email: env.ADMIN_EMAIL }, 'Admin user ensured');
}

