import { registerAs } from '@nestjs/config';

import { env } from '@/helper/config';

export const google = registerAs('google', () => ({
  clientId: env('GOOGLE_CLIENT_ID'),
  secret: env('GOOGLE_SECRET'),
}));

export type IGoogleConfig = ReturnType<typeof google>;
