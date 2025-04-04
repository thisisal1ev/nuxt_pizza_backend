import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare, hashSync } from 'bcrypt';
import { Omit } from 'utility-types';

import { PrismaService } from 'src/prisma.service';

// Define a type that omits the password field
export type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user;

      return result as UserWithoutPassword;
    }

    return null;
  }

  async login(user: { email: string; password: string }) {
    try {
      const payload = { fullName: user.email, sub: user.password };

      return {
        access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
        refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      };
    } catch (e) {
      console.error(e);
    }
  }

  async register(email: string, password: string, fullName: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = hashSync(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          fullName,
        },
      });

      const { password: _, ...result } = user;

      return result;
    } catch (error) {
      if (error?.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const newPayload = { fullName: payload.fullName, sub: payload.sub };

      return {
        access_token: this.jwtService.sign(newPayload, { expiresIn: '15m' }),
        refresh_token: this.jwtService.sign(newPayload, { expiresIn: '7d' }),
      };
    } catch (error) {
      throw new UnauthorizedException('Неверный refresh token');
    }
  }

  async all() {
    return this.prisma.user.findMany();
  }
}
