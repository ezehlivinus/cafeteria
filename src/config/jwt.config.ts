import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  options: {
    issuer: 'your-app-name',
    audience: 'your-app-name.com',
    subject: 'your-app-name:user',
    expiresIn: process.env.NODE_ENV !== 'development' ? '6h' : '1d',
    algorithm: 'HS256'
  },
  secret: process.env.JWT_SECRET
}));
