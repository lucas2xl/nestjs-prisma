import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const isPrismaClientError = (error: PrismaClientKnownRequestError) => {
  return (
    typeof error.code === 'string' &&
    typeof error.clientVersion === 'string' &&
    (typeof error.meta === 'undefined' || typeof error.meta === 'object')
  );
};
