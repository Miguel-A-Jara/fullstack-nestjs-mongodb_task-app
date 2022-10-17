import { BadRequestException, Injectable }  from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model }       from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto }  from './dto/login-user.dto';
import { User, UserDocument } from './schema/users.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

  private createToken(id: string) {
    return jwt.sign({id}, process.env.SECRET, { expiresIn: '3d' });
  }

  async signUpUser(createUserDto: CreateUserDto) {

    const { username, email, password } = createUserDto;

    const user = await this.userModel.findOne({ $or: [ { username }, { email } ] });

    if ( user )
      throw new BadRequestException('User already exists');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);    

    const createdUser = await this.userModel.create({ ...createUserDto, password: hash });
    const token = this.createToken(createdUser.id);

    return { createdUser, token };
  }

  async logInUser(loginUserDto: LoginUserDto) {

    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ $and: [ { email }, { password } ] });

    if (!user) 
      throw new BadRequestException('Account not found');

    const token = this.createToken(user._id.toString());
    
    return { user, token };
  }
}
