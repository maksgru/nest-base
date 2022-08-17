import {
  CallHandler,
  ExecutionContext, HttpException, HttpStatus,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import asyncLocalStorage from '../utils/async-local-storage';


export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {
    this.logger = logger;
  }
  // TODO log traceId for incoming and outcoming requests

  public intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const traceId = asyncLocalStorage.getStore().get('traceId');
    return next
      .handle()
      .pipe(
        catchError((err: HttpException) => {
          this.logger.error(`${err.message}; traceId: ${traceId}`);
          return throwError(() => new HttpException(
            err.message,
            err.getStatus ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR));
        }),
      );
  }
}
