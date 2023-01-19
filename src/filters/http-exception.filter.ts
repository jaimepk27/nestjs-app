import { Request, Response } from 'express';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

export interface ErrorResponse {
  statusCode: number;
  message: string | Array<string>;
  error: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const path = ctx.getRequest<Request>().path;
    const status = exception.getStatus();

    const { error, message } = exception.getResponse() as ErrorResponse;

    if (status < 500) {
      this.logger.warn(
        `Failed to complete incoming request, status=${status}, path=${path}`,
        exception,
      );
    } else {
      this.logger.error(
        `Failed to complete incoming request, status=${status}, path=${path}`,
        exception,
      );
    }

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
