import { PipeTransform } from "@nestjs/common";
export declare class ParseMongoId implements PipeTransform<string> {
    transform(value: string): string;
}
