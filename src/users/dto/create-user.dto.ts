import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

  @IsString({ message: 'The username must contain valid characters' })
  @MinLength(3, { message: 'username is too short! (3 characters)' })
  @MaxLength(10, { message: 'username is too long! (10 characters)' })
  username: string;

  @IsEmail({ message: 'Email must be a valid address' })
  @MinLength(3, { message: 'Email is too short! (5 characters)' })
  @MaxLength(50, { message: 'Email is too long! (50 characters)' })
  email: string;

  @MinLength(5, { message: 'Password is too short! (5 characters)' })
  @MaxLength(20, { message: 'Password is too long! (20 characters)' })
  password: string;
}
