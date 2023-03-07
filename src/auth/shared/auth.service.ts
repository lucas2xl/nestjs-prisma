import { UserEntity } from '@/users/entities/user.entity';
import { UsersRepository } from '@/users/repositories/users-repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Incorrect email/password combination');
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new UnauthorizedException('Incorrect email/password combination');
    }

    delete user.password;
    return user;
  }

  login(user: Pick<UserEntity, 'id' | 'isAdmin'>) {
    const payload = { sub: user.id, isAdmin: user.isAdmin };
    return this.jwtService.sign(payload);
  }
}
