import { ApiProperty } from "@nestjs/swagger";

export class CreateBorrowDto {
  @ApiProperty()
  memberId: number;

  @ApiProperty()
  bookId: number;
}