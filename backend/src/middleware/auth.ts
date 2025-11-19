import fp from 'fastify-plugin';
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import env from '@config/env';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

const authPlugin = fp(async (fastify) => {
  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        return reply.code(401).send({ message: 'Missing Authorization header' });
      }

      const token = authHeader.replace('Bearer ', '');
      const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
      request.user = payload;
    } catch (error) {
      reply.code(401).send({ message: 'Invalid token' });
    }
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    user: JwtPayload;
  }
}

export default authPlugin;
