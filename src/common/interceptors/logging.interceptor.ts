import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const { method, path: url } = request;
    const userAgent = request.get('user-agent') || '';
    const ip = request.ip;
    const correlationKey = uuidv4();
    const userId = request.user?._id
      ? request.user._id
      : "'Guest: unauthenticated user'";

    this.logger.log(
      `[${correlationKey}] ${method} ${url} ${userId} ${userAgent} ${ip}: ${
        context.getClass().name
      } ${context.getHandler().name}`
    );

    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        const contentLength = response.get('content-length');
        const duration = Date.now() - start;

        this.logger.log(
          `[${correlationKey}] ${method} ${url} ${statusCode} ${contentLength}: ${duration}ms`
        );
      })
    );
  }
}
