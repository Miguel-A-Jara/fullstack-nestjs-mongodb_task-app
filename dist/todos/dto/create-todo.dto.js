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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTodoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateTodoDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: 'The author must contain valid characters' }),
    (0, class_validator_1.MinLength)(3, { message: 'Author is too short! (3 characters)' }),
    (0, class_validator_1.MaxLength)(10, { message: 'Author is too long! (10 characters)' }),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5, { message: 'Title is too short!' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Title is too long!' }),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.MinLength)(10, { message: 'Description is too short!' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Description is too long!' }),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: 'Priority must be a number from 1 to 5' }),
    (0, class_validator_1.Max)(5, { message: 'Priority must be a number from 1 to 5' }),
    __metadata("design:type", Number)
], CreateTodoDto.prototype, "priority", void 0);
exports.CreateTodoDto = CreateTodoDto;
//# sourceMappingURL=create-todo.dto.js.map