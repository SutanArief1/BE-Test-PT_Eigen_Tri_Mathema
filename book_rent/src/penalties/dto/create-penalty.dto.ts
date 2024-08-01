import { ApiProperty } from "@nestjs/swagger";

export class CreatePenaltyDto {
  @ApiProperty()
  penaltyStartDate: Date;

  @ApiProperty()
  penaltyEndDate: Date;

  @ApiProperty()
  memberId: number;
}