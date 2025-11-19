import pino from 'pino';
import env from '@config/env';

const logger = pino({
  level: env.LOG_LEVEL,
  transport: env.NODE_ENV === 'development' ? { target: 'pino-pretty' } : undefined
});

export default logger;
