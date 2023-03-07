import { CreateUserDto } from '../../../users/dto/create-user.dto';
import { UpdateUserDto } from '../../../users/dto/update-user.dto';
import { UserEntity } from '../../../users/entities/user.entity';

export interface UsersProtocol {
  store(createUserDto: CreateUserDto): Promise<UserEntity>;
  index(): Promise<UserEntity[]>;
  show(id: string): Promise<UserEntity>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<void>;
  destroy(id: string): Promise<void>;
  findById(id: string): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
}
