import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, StreamableFile, Response, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ParseMongoId } from './../common/pipes/parse-mongo-id.pipe';
import { TodosService } from './todos.service';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { createReadStream } from 'fs';
<<<<<<< HEAD
import { extname, join } from 'path';
=======
import { join } from 'path';
>>>>>>> c245ecd0aebe8132dece38b5ed1683c68bc97901
import { diskStorage } from 'multer';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoId) id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseMongoId) id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoId) id: string) {
    return this.todosService.remove(id);
  }

  @Get('image/:param')
  getImage(@Param('param') param: string, @Response({ passthrough: true }) res) {

    res.set({
      'Content-Type': 'image/jpeg',
    });

    const image = createReadStream(join(process.cwd(), 'upload', param));

    return new StreamableFile(image);
  }

  @Post('image')
<<<<<<< HEAD
  @UseInterceptors(FileInterceptor('file', { storage: diskStorage({
    destination: (req, file, cb) => (
      cb(null, './upload')
    ),
    filename(req, file, callback) {
      const name = req.body.id;
      return callback(null, `${name}`);
    },
  }) }))
  uploadImage(@UploadedFile() file: Express.Multer.File, @Body() body){
=======
  @UseInterceptors(FileInterceptor('file', {storage: diskStorage({
    destination: './upload',
    filename(req, file, callback) {
      return callback(null, `${req.body.id}`);
    },
  })}))
  uploadImage(@UploadedFile() file: Express.Multer.File){
>>>>>>> c245ecd0aebe8132dece38b5ed1683c68bc97901
    return { name: file.filename };
  }
}
