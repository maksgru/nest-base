import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { IExceptionResponse } from '../interfaces/exception-response.interface';
import asyncLocalStorage from '../utils/async-local-storage';

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const responseBody = this.getResponseBody(exception);
    response.status(responseBody.status).send(responseBody);
  }

  private getResponseBody = (exception: HttpException): IExceptionResponse => {
    const message = this.getMessage(exception);
    const traceId = asyncLocalStorage.getStore().get('traceId');
    return {
      status: exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      message,
      traceId,
    };
  };

  private getMessage = (e: HttpException) => {
    const res = e.getResponse() as { message: string | string[] };
    return res.message ? String(res.message) : String(res);
  };
}
