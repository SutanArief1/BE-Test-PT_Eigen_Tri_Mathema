import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BorrowsService {
  constructor(private prisma: PrismaService) { }

  async create(createBorrowDto: CreateBorrowDto) {
    const [member, book] = await Promise.all([
      this.prisma.member.findUnique({
        where: {
          id: createBorrowDto.memberId
        }
      }),
      this.prisma.book.findUnique({
        where: {
          id: createBorrowDto.bookId
        }
      })
    ])

    if (!member || !book) {
      throw new HttpException('Member or book not found', HttpStatus.NOT_FOUND);
    }

    const isMemberPenalized = await this.prisma.penalty.findFirst({
      where: {
        memberId: createBorrowDto.memberId,
        penaltyEndDate: {
          gte: new Date()
        }
      }
    })

    if (isMemberPenalized) {
      throw new HttpException('Member is currently being penalized', HttpStatus.BAD_REQUEST);
    }

    const existedBorrow = await this.prisma.borrow.findFirst({
      where: {
        bookId: createBorrowDto.bookId,
        isReturned: false,
      },
    });    

    if (existedBorrow && existedBorrow.memberId !== createBorrowDto.memberId && book.stock < 1) {
      throw new HttpException('This book is already borrowed by another member', HttpStatus.BAD_REQUEST);
    } else if (existedBorrow && existedBorrow.memberId === createBorrowDto.memberId && existedBorrow.bookId === createBorrowDto.bookId) {
      const durationBorrowBook = Math.floor((new Date().getTime() - new Date(existedBorrow.borrowDate).getTime()) / (1000 * 60 * 60 * 24));

      if (durationBorrowBook > 7) {
        await this.prisma.penalty.create({
          data: {
            penaltyStartDate: new Date(),
            penaltyEndDate: new Date(new Date().setDate(new Date().getDate() + 3)),
            memberId: createBorrowDto.memberId
          }
        })

        await this.prisma.borrow.update({
          where: { id: existedBorrow.id },
          data: {
            returnDate: new Date(),
            isReturned: true,
          },
        });

        await this.prisma.book.update({
          where: { id: book.id },
          data: { stock: book.stock + 1 },
        });

        return `You have been penalized for borrowing more than 7 days!`;
      }

      await this.prisma.borrow.update({
        where: { id: existedBorrow.id },
        data: {
          returnDate: new Date(),
          isReturned: true,
        },
      });

      await this.prisma.book.update({
        where: { id: book.id },
        data: { stock: book.stock + 1 },
      });

      return `Thanks for returning the book!`;
    }

    const totalBorrowed = await this.prisma.borrow.count({
      where: {
        memberId: createBorrowDto.memberId,
        isReturned: false,
      },
    });

    if (totalBorrowed >= 2) {
      throw new HttpException('Member cannot borrow more than 2 books', HttpStatus.BAD_REQUEST);
    }

    if (book.stock < 1) {
      throw new HttpException('Book is not available', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.book.update({
      where: { id: book.id },
      data: { stock: book.stock - 1 },
    });

    const newBorrow = await this.prisma.borrow.create({
      data: createBorrowDto
    })

    return {
      data: newBorrow,
      message: 'Book borrowed successfully',
    }
  }

  findAll() {
    return this.prisma.borrow.findMany({
      include: {
        member: {
          select: {
            code: true,
            name: true,
          }
        }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.borrow.findUnique({ where: { id } });
  }

  update(id: number, updateBorrowDto: UpdateBorrowDto) {
    return `This action updates a #${id} borrow`;
  }

  async remove(id: number) {
    const data = await this.prisma.borrow.delete({ where: { id } });

    return {
      data,
      message: 'Data deleted successfully',
    }
  }
}
