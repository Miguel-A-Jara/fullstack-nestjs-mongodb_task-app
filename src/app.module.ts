import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodosModule } from './todos/todos.module';

console.log("\n\n\n\n\n MONGODB:",process.env.MONGO_URL,"\n\n\n\n\n\n")

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    TodosModule,
  ],
  controllers: [],
  providers: [],
})


export class AppModule {}
