import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';

interface JWTResponse {
  username: string;
  iat     : number;
  exp     : number;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request & { user: string }, res: Response, next: NextFunction) {

    if ( !req.headers.authorization )
      throw new BadRequestException('User must be authenticated');

    const token = req.headers.authorization.split(' ')[1];
    
    try {
      
      const verify = jwt.verify(token, process.env.SECRET);
      const { username } = verify as JWTResponse;

      //binding the username to our req parameter;
      req.user = username;
      next();

    } catch (error) {
      throw new BadRequestException(error); 
    }
  }
}
