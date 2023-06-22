import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import { format } from 'winston';
const configService = new ConfigService();

const isDevelopment =
  (configService.get('app.envName') || configService.get('NODE_ENV')) ===
  'development';
const isProduction =
  (configService.get('app.envName') || configService.get('NODE_ENV')) ===
  'production';
const logFormat = isDevelopment ? format.simple() : format.json();
const logLevel = isDevelopment ? 'debug' : 'info';

const winstonOptions = {
  level: 'info',

  transports: [
    // do not log to console when in production
    !isProduction &&
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.prettyPrint({
            colorize: true
          })
        )
      }),

    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json()
      ),
      // deletes the logs file/folder if its size reaches 5mb
      maxsize: 5 * 1024 * 1024 // 5mb
    })
  ].filter(Boolean)
};

// To be used without injecting into a class
export const logger = winston.createLogger({
  ...winstonOptions
});
