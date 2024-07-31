import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    const existedBook = await this.prisma.book.findFirst({
      where: {
        code: createBookDto.code
      }
    })
    
    if (existedBook) {
      throw new HttpException('Book already exists', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.book.create({
      data: createBookDto
    })
  }

  findAll() {
    return this.prisma.book.findMany();
  }

  findOne(code: string) {
    return this.prisma.book.findUnique({
      where: {
        code
      }
    })
  }

  async update(id: number, updateBookDto: UpdateBookDto) {    
    await this.prisma.book.update({
      where: {
        id
      },
      data: updateBookDto
    })

    return {
      success: true,
      message: "Book updated successfully",
      data: updateBookDto
    }
  }

  remove(id: number) {
    return this.prisma.book.delete({
      where: {
        id
      }
    })
  }
}
