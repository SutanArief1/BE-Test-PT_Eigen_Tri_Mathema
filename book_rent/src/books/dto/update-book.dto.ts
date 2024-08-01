import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty()
  code?: string;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  author?: string;

  @ApiProperty()
  stock?: number;
}
