import type { IAuthUser } from './auth';

// eslint-disable-next-line import/order
import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user?: IAuthUser;
  }
}
