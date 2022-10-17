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
exports.TodosController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const parse_mongo_id_pipe_1 = require("./../common/pipes/parse-mongo-id.pipe");
const todos_service_1 = require("./todos.service");
const create_todo_dto_1 = require("./dto/create-todo.dto");
const update_todo_dto_1 = require("./dto/update-todo.dto");
const fs_1 = require("fs");
const path_1 = require("path");
const multer_1 = require("multer");
let TodosController = class TodosController {
    constructor(todosService) {
        this.todosService = todosService;
    }
    create(createTodoDto, request) {
        return this.todosService.create(createTodoDto, request.user);
    }
    findAll(request) {
        return this.todosService.findAll(request.user);
    }
    findOne(id) {
        return this.todosService.findOne(id);
    }
    update(id, updateTodoDto) {
        return this.todosService.update(id, updateTodoDto);
    }
    remove(id) {
        return this.todosService.remove(id);
    }
    getImage(param, res) {
        res.set({
            'Content-Type': 'image/jpeg',
        });
        const image = (0, fs_1.createReadStream)((0, path_1.join)(process.cwd(), 'upload', param));
        return new common_1.StreamableFile(image);
    }
    uploadImage(file, body) {
        return { name: file.filename };
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_todo_dto_1.CreateTodoDto, Object]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_mongo_id_pipe_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', parse_mongo_id_pipe_1.ParseMongoId)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_todo_dto_1.UpdateTodoDto]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_mongo_id_pipe_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('image/:param'),
    __param(0, (0, common_1.Param)('param')),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "getImage", null);
__decorate([
    (0, common_1.Post)('image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => (cb(null, './upload')),
            filename(req, file, callback) {
                const name = req.body.id;
                return callback(null, `${name}`);
            },
        }) })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "uploadImage", null);
TodosController = __decorate([
    (0, common_1.Controller)('todos'),
    __metadata("design:paramtypes", [todos_service_1.TodosService])
], TodosController);
exports.TodosController = TodosController;
//# sourceMappingURL=todos.controller.js.map