import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  LOG_LEVEL: z.string().default('info'),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(16, 'JWT secret must be at least 16 characters'),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD_HASH: z.string().default(''),
  GITHUB_USERNAME: z.string().default(''),
  GITHUB_TOKEN: z.string().default(''),
  GITHUB_EXCLUDE_PATTERNS: z.string().default(''),
  GITHUB_PROJECTS_LIMIT: z.coerce.number().default(30),
  ATTACHMENTS_DIR: z.string().default('./uploads')
});

const env = envSchema.parse(process.env);

export default env;
