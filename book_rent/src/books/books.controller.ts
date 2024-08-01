import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'Book created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({
    status: 200,
    description: 'Returns all books',
  })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get a book by code' })
  @ApiResponse({
    status: 200,
    description: 'Returns a book by code',
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  findOne(@Param('code') code: string) {
    return this.booksService.findOne(code);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a book' })
  @ApiResponse({
    status: 200,
    description: 'Book updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  @ApiResponse({
    status: 200,
    description: 'Book deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
