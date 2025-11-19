import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import env from '@config/env';
import logger from '@lib/logger';
import prismaPlugin from '@plugins/prisma';
import authPlugin from '@middleware/auth';
import registerRoutes from '@routes/index';

export async function buildServer() {
  const fastify = Fastify({
    logger: false,
    loggerInstance: logger
  });

  await fastify.register(cors, {
    origin: true,
    credentials: true
  });

  await fastify.register(multipart, {
    limits: {
      fileSize: 25 * 1024 * 1024 // 25MB
    }
  });

  await fastify.register(prismaPlugin);
  await fastify.register(authPlugin);
  await fastify.register(registerRoutes);

  return fastify;
}

export async function start() {
  const server = await buildServer();

  try {
    await server.listen({ port: env.PORT, host: '0.0.0.0' });
    server.log.info(`🚀 API ready on port ${env.PORT}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

if (require.main === module) {
  start();
}
