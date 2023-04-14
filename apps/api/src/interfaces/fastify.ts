import type { IAuthUser } from './auth';

import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    authUser?: IAuthUser;
  }
}
