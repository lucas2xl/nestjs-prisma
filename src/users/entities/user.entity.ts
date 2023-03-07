import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
