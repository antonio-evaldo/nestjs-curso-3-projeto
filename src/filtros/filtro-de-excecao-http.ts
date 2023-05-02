import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException)
export class FiltroDeExcecaoHttp implements ExceptionFilter {
  catch(excecao: HttpException, host: ArgumentsHost) {
    console.log(excecao);

    const contexto = host.switchToHttp();
    const res = contexto.getResponse<Response>();
    const req = contexto.getRequest<Request>();

    const status = excecao.getStatus();

    res.status(status).json({
      statusCode: status,
      message: excecao.message,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
