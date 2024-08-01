// export class CreateBookDto {
//   code: string;
//   title: string;
//   author: string;
//   stock: number;
// }

import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  stock: number;
}