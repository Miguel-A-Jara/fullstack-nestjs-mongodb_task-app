"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseMongoId = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
class ParseMongoId {
    transform(value) {
        if (!(0, mongoose_1.isValidObjectId)(value)) {
            throw new common_1.BadRequestException(`'${value}' is not a valid MongoId`);
        }
        return value;
    }
}
exports.ParseMongoId = ParseMongoId;
//# sourceMappingURL=parse-mongo-id.pipe.js.map