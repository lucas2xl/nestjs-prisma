import { Injectable } from '@nestjs/common';
import { UsersProtocol } from '../../common/filters/protocols/users-protocol';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository implements UsersProtocol {
  constructor(private readonly prisma: PrismaService) {}

  async store(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({ data: createUserDto });
  }

  async index(): Promise<UserEntity[]> {
    return this.prisma.user.findMany();
  }

  async show(id: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    await this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async destroy(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async findById(id: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
