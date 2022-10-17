import { IsEmail, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

  @IsEmail({ message: 'Email must be a valid address' })
  @MinLength(3, { message: 'Email is too short! (5 characters)' })
  @MaxLength(50, { message: 'Email is too long! (50 characters)' })
  email: string;

  @MinLength(5, { message: 'Password is too short! (5 characters)' })
  @MaxLength(20, { message: 'Password is too long! (20 characters)' })
  password: string;

}
