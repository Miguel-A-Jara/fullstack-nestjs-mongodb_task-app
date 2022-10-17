import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './common/middlewares/auth.middleware';

console.log("\n\n\n\n\n MONGODB:",process.env.MONGO_URL,"\n\n\n\n\n\n")

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    TodosModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('todos');
  }
};
console.log("\n\n\n\n\n MONGODB:",process.env.MONGO_URL,"\n\n\n\n\n\n")
