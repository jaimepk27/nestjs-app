import { Request, Response, NextFunction } from 'express';

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `Incoming HTTP request, method=${req.method}, path=${req.originalUrl}`,
    );

    next();
  }
}
