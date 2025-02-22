import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hashSync } from 'bcrypt';

import { PrismaService } from 'src/prisma.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: receiving and validating JWT tokens
  async login(req: { body: LoginDto }) {
    const body: LoginDto = req.body;

    try {
      const findUser = await this.prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });

      if (!findUser) {
        throw new UnauthorizedException('User not found');
      }

      const comparePasswords = await compare(body.password, findUser.password);

      if (!comparePasswords) {
        throw new UnauthorizedException('Invalid password');
      }

      const { password, ...result } = findUser;

      return result;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  // TODO: send verification code to email and generate JWT token
  async register(req: { body: RegisterDto }) {
    const body = req.body;

    try {
      const findUser = await this.prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });

      if (findUser) {
        if (!findUser.verified) {
          throw new UnauthorizedException('Email not verified');
        }

        throw new UnauthorizedException('User already exists');
      }

      const { password, ...result } = await this.prisma.user.create({
        data: {
          fullName: body.fullName,
          email: body.email,
          password: hashSync(body.password, 10),
        },
      });

      // TODO: send verification code to email
      // const code = Math.floor(100000 + Math.random() * 900000).toString();

      // await this.prisma.verificationCode.create({
      //   data: {
      //     code,
      //     userId: createdUser.id,
      //   },
      // });

      return result;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
