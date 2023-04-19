import { registerAs } from '@nestjs/config';

import { env, envNumber } from '@/config/env';

export const mailer = registerAs('mailer', () => ({
  host: env('EMAIL_HOST'),
  port: envNumber('EMAIL_PORT'),
  ignoreTLS: true,
  secure: true,
  auth: {
    user: env('EMAIL_USER'),
    pass: env('EMAIL_PASS'),
  },
}));

export type IMailerConfig = ReturnType<typeof mailer>;
