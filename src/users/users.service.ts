import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  signUpUser(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  logInUser(loginUserDto: LoginUserDto) {
    return loginUserDto;
  }
}
