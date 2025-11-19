import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { login } from '@services/authService';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/api/auth/login', async (request, reply) => {
    const body = bodySchema.parse(request.body);

    try {
      const result = await login(fastify.prisma, body.email, body.password);
      reply.send(result);
    } catch (error) {
      reply.code(401).send({ message: 'Invalid credentials' });
    }
  });
}
