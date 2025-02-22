import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  fullName: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
