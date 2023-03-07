import { UserEntity } from '@/users/entities/user.entity';

declare namespace Express {
  export interface Request {
    user: UserEntity;
  }
}
