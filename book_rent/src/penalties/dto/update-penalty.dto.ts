import { PartialType } from '@nestjs/mapped-types';
import { CreatePenaltyDto } from './create-penalty.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePenaltyDto extends PartialType(CreatePenaltyDto) {
  @ApiProperty()
  penaltyStartDate?: Date

  @ApiProperty()
  penaltyEndDate?: Date

  @ApiProperty()
  memberId?: number
}
