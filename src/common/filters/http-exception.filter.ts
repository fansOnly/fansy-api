import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception['status'] || 500;
    const message = exception['message'] || 'Internal server error';
    const error = exception['error'] || 'Internal server error';
    const stack = exception['stack'] || 'Internal server error';
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      error,
      stack,
    });
  }
}
