import { BadRequestException, PipeTransform } from "@nestjs/common";
import { isValidObjectId } from "mongoose";

export class ParseMongoId implements PipeTransform<string> {
  transform(value: string) {
    if( !isValidObjectId(value) ) {
      throw new BadRequestException(`'${value}' is not a valid MongoId`);
    }
    return value;
  }
}