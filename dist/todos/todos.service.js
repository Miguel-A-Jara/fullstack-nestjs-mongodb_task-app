"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const todos_schema_1 = require("./schema/todos.schema");
let TodosService = class TodosService {
    constructor(todoModel) {
        this.todoModel = todoModel;
    }
    async create(createTodoDto, user) {
        await this.validateExistingTitle(createTodoDto.title);
        return await this.todoModel.create(Object.assign(Object.assign({}, createTodoDto), { author: user }));
    }
    async findAll(user) {
        return await this.todoModel.find({ author: user }, { "__v": 0 });
    }
    async findOne(id) {
        const foundTodo = await this.todoModel.findById(id, { "__v": 0 });
        if (!foundTodo)
            throw new common_1.NotFoundException(`Todo with ID: '${id}' does not exist`);
        return foundTodo;
    }
    async update(id, updateTodoDto) {
        if (JSON.stringify(updateTodoDto).length === 2)
            throw new common_1.BadRequestException(`Bad request, body is empty`);
        await this.findOne(id);
        await this.validateExistingTitle(updateTodoDto.title);
        return await this.todoModel.findOneAndUpdate({ _id: id }, Object.assign({}, updateTodoDto), { returnDocument: 'after' });
    }
    async remove(id) {
        const todo = await this.findOne(id);
        await this.todoModel.findOneAndDelete({ _id: id });
        return `'${todo.title}' deleted successfully! (ID: ${todo.id})`;
    }
    async validateExistingTitle(title) {
        const todo = await this.todoModel.findOne({ title: title });
        if (todo)
            throw new common_1.BadRequestException(`Title: '${todo.title}' already exists.`);
    }
};
TodosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(todos_schema_1.Todo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TodosService);
exports.TodosService = TodosService;
//# sourceMappingURL=todos.service.js.map