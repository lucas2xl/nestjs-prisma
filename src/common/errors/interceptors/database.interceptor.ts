import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';
import { catchError, Observable } from 'rxjs';
import { isPrismaClientError } from '../utils/is-prisma-client-error';
import { PrismaErrors } from '../utils/prisma-errors';

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (isPrismaClientError(error)) {
          const { code, meta } = error as PrismaClientKnownRequestError;

          throw new ConflictException(PrismaErrors[code](meta.target));
        } else if (
          error instanceof PrismaClientUnknownRequestError ||
          error instanceof PrismaClientRustPanicError ||
          error instanceof PrismaClientValidationError
        ) {
          throw new ConflictException(`Database error`);
        } else {
          throw error;
        }
      }),
    );
  }
}
