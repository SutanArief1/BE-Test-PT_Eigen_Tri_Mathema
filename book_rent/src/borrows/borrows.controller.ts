import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('borrows')
@Controller('borrows')
export class BorrowsController {
  constructor(private readonly borrowsService: BorrowsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new borrow' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createBorrowDto: CreateBorrowDto) {
    return this.borrowsService.create(createBorrowDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all borrows' })
  @ApiResponse({ status: 200, description: 'The record has been successfully fetched.' })
  findAll() {
    return this.borrowsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single borrow' })
  @ApiResponse({ status: 200, description: 'The record has been successfully fetched.' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  findOne(@Param('id') id: string) {
    return this.borrowsService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a borrow' })
  @ApiResponse({ status: 200, description: 'The record has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  remove(@Param('id') id: string) {
    return this.borrowsService.remove(+id);
  }
}
