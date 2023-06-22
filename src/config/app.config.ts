import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  envName: process.env.NODE_ENV || 'development',
  apiPrefix: 'api/v1',
  port: Number.parseInt(process.env.APP_PORT || process.env.PORT, 10) || 9092
}));
