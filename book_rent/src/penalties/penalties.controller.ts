import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PenaltiesService } from './penalties.service';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { UpdatePenaltyDto } from './dto/update-penalty.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Penalties / This API is only for testing some cases')
@Controller('penalties')
export class PenaltiesController {
  constructor(private readonly penaltiesService: PenaltiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new penalty / In real case this API handles automatically' })
  @ApiResponse({ status: 201, description: 'The penalty has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createPenaltyDto: CreatePenaltyDto) {
    return this.penaltiesService.create(createPenaltyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all penalties' })
  @ApiResponse({ status: 200, description: 'Return all penalties' })
  findAll() {
    return this.penaltiesService.findAll();
  }

  @Get(':memberId')
  @ApiOperation({ summary: 'Get penalty by member id' })
  @ApiResponse({ status: 200, description: 'Return penalty by member id' })
  @ApiResponse({ status: 404, description: 'Member not found' })
  findOne(@Param('memberId') memberId: number) {
    return this.penaltiesService.findOne(+memberId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update penalty by id' })
  @ApiResponse({ status: 200, description: 'The penalty has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Penalty not found' })
  update(@Param('id') id: string, @Body() updatePenaltyDto: UpdatePenaltyDto) {
    return this.penaltiesService.update(+id, updatePenaltyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete penalty by id' })
  @ApiResponse({ status: 200, description: 'The penalty has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Penalty not found' })
  remove(@Param('id') id: string) {
    return this.penaltiesService.remove(+id);
  }
}
