import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';
import env from '@config/env';
import logger from '@lib/logger';
import { ensureAdminUser } from '@services/setupService';

const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['warn', 'error']
});

prisma.$connect()
  .then(async () => {
    logger.info('Prisma connected');
    await ensureAdminUser(prisma);
  })
  .catch((err: unknown) => {
    logger.error({ err }, 'Failed to connect to database');
    process.exit(1);
  });

export default fp(async (fastify) => {
  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async () => {
    await prisma.$disconnect();
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}
