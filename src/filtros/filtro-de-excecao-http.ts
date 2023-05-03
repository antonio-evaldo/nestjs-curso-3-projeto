import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
export class FiltroDeExcecaoHttpGlobal implements ExceptionFilter {
  catch(excecao: Error, host: ArgumentsHost) {
    console.log(excecao);

    const contexto = host.switchToHttp();
    const res = contexto.getResponse<Response>();
    const req = contexto.getRequest<Request>();

    const status =
      excecao instanceof HttpException
        ? excecao.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    res.status(status).json({
      statusCode: status,
      message: excecao.message,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
