import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) { }
  async create(createMemberDto: CreateMemberDto) {
    const existedMember = await this.prisma.member.findUnique({
      where: {
        code: createMemberDto.code
      }
    })

    if (existedMember) {
      throw new HttpException('Member already exists', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.member.create({
      data: createMemberDto
    })
  }

  findAll() {
    const member = this.prisma.member.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        _count: {
          select: {
            Borrow: {
              where: {
                isReturned: false
              }
            }
          }
        },
        Penalty: true,
      }
    });
    return member
  }

  findOne(code: string) {
    return this.prisma.member.findUnique({
      where: {
        code
      }
    })
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    this.prisma.member.update({
      where: {
        id
      },
      data: updateMemberDto
    })

    return {
      success: true,
      message: 'Member updated successfully',
      data: updateMemberDto
    }
  }

  remove(id: number) {
    return this.prisma.member.delete({
      where: {
        id
      }
    })
  }
}
