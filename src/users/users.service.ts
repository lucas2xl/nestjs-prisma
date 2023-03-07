import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users-repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async store(createUserDto: CreateUserDto) {
    const passwordHashed = await hash(createUserDto.password, 8);

    const newUser: CreateUserDto = {
      ...createUserDto,
      password: passwordHashed,
    };
    const user = await this.repository.store(newUser);
    delete user.password;
    return user;
  }

  async show(id: string) {
    const user = await this.repository.show(id);
    if (!user) throw new NotFoundException('User not found');

    delete user.password;
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.repository.update(id, updateUserDto);
  }

  async destroy(id: string) {
    await this.repository.destroy(id);
  }
}
