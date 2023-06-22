import { logger as WinstonLogger } from '@/config/logger.config';
import {
  Logger,
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  InternalServerErrorException,
  ExecutionContext
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();
  private readonly winstonLogger = WinstonLogger;

  private readonly configService = new ConfigService();

  catch(exception: unknown, host: ArgumentsHost) {
    // it does not print stack trace
    // this.logger.error(exception); // Nest logger

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    // Request details
    const { method, path: url } = request;
    const userAgent = request.get('user-agent') || '';
    const ip = request.ip;
    const correlationKey = uuidv4();
    const userId = request.user?._id
      ? `auth-user-id: ${request.user._id}`
      : "'Guest: unauthenticated user'";

    const envName =
      this.configService.get('NODE_ENV') ||
      this.configService.get('app.envName');

    const requestMetaData = `[${correlationKey}] ${method} ${url} ${userId} ${userAgent} ${ip} env: ${envName}`;

    // log any error when in staging and development
    if (envName !== 'production') {
      this.winstonLogger.error(requestMetaData, exception);
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorResponse = exception.getResponse() as {
        message: string[] | string;
      };
      let errorMessage: string;

      if (exception instanceof ForbiddenException) {
        errorMessage =
          'Forbidden resource: You are not allowed to take this action or access this resource.';
      } else if (exception instanceof UnauthorizedException) {
        errorMessage =
          'Unauthorized access: You need to be logged in to take this action.';
      } else if (typeof errorResponse.message === 'string') {
        errorMessage = errorResponse.message;
      } else {
        errorMessage = errorResponse.message[0];
      }

      return response.status(status).json({
        success: false,
        error: errorMessage,
        errors: Array.isArray(errorResponse.message)
          ? errorResponse.message
          : undefined
      });
    }

    if (exception instanceof mongoose.Error.ValidationError) {
      const errorMessages: string[] = Object.values(exception.errors).map(
        (e) => e.message
      );
      return response.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: errorMessages[0],
        errors: errorMessages
      });
    }

    //
    if (envName === 'production') {
      this.winstonLogger.error(requestMetaData, exception);
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: 'Something went wrong. Please try again later.'
    });
  }
}
