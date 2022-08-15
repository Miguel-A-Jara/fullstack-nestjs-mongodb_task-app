import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsString({ message: 'The author must contain valid characters' })
  @MinLength(3, { message: 'Title is too short!' })
  author: string;

  @ApiProperty()
  @IsString()
  @MinLength(5, { message: 'Title is too short!' })
  @MaxLength(50, { message: 'Title is too long!' })
  title: string;

  @ApiProperty()
  @MinLength(10, { message: 'Description is too short!' })
  @MaxLength(100, { message: 'Description is too long!' })
  description: string;

  @ApiProperty()
  @IsInt()
  @Min(1, { message: 'Priority must be a number from 1 to 5' })
  @Max(5, { message: 'Priority must be a number from 1 to 5' })
  priority: number;
}
