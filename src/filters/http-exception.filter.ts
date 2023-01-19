import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

export interface ErrorResponse {
  statusCode: number;
  message: string | Array<string>;
  error: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const path = ctx.getRequest<Request>().path;
    const status = exception.getStatus();

    const { error, message } = exception.getResponse() as ErrorResponse;

    console.log(exception);

    res.status(status).json({
      status,
      error,
      message,
      path,
      timestamp: new Date(),
    });
  }
}
