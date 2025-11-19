import { FastifyInstance } from 'fastify';
import authRoutes from './auth';
import postRoutes from './posts';
import projectRoutes from './projects';
import attachmentRoutes from './attachments';
import healthRoutes from './health';

export default async function registerRoutes(fastify: FastifyInstance) {
  await fastify.register(healthRoutes);
  await fastify.register(authRoutes);
  await fastify.register(postRoutes);
  await fastify.register(projectRoutes);
  await fastify.register(attachmentRoutes);
}
