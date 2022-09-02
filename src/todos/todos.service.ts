import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto }      from './dto/create-todo.dto';
import { UpdateTodoDto }      from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schema/todos.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto) {
    await this.validateExistingTitle(createTodoDto.title);
    return await this.todoModel.create(createTodoDto);
  }

  async findAll() {
    return await this.todoModel.find({}, { "__v": 0 });
  }

  async findOne(id: string) {
    const foundTodo = await this.todoModel.findById(id, { "__v": 0 });
    if(!foundTodo) throw new NotFoundException(`Todo with ID: '${id}' does not exist`);
    return foundTodo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    // If the body is empty, then we return an error.
    if(JSON.stringify(updateTodoDto).length === 2) throw new BadRequestException(`Bad request, body is empty`);

    await this.findOne(id);
    await this.validateExistingTitle(updateTodoDto.title);

    //If we get to this point, is safe to insert into the DataBase
    return await this.todoModel.findOneAndUpdate({_id: id}, {...updateTodoDto}, { returnDocument: 'after' });
  }

  async remove(id: string) {
    const todo = await this.findOne(id);

    //If we get to this point, is safe to remove from the DataBase
    await this.todoModel.findOneAndDelete({_id: id});
    return `'${todo.title}' by ${todo.author} deleted successfully! (ID: ${todo.id})`;
  }

  async validateExistingTitle(title: string) {
    const todo = await this.todoModel.findOne({ title: title });
    if( todo ) throw new BadRequestException(`Title: '${todo.title}' already exists.`);
  }
}
