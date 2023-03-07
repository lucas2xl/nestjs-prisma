import { EXPIRES_IN, JWT_SECRET } from '@/config/auth';
import { PrismaService } from '@/database/prisma/prisma.service';
import { UsersRepository } from '@/users/repositories/users-repository';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './shared/auth.service';
import { JwtStrategy } from './shared/jwt.strategy';
import { LocalStrategy } from './shared/local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UsersRepository,
    PrismaService,
  ],
})
export class AuthModule {}
