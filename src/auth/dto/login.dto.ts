import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
