import { Injectable } from '@nestjs/common';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { UpdatePenaltyDto } from './dto/update-penalty.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PenaltiesService {
  constructor(private prisma: PrismaService) {}
  create(createPenaltyDto: CreatePenaltyDto) {
    return 'This action adds a new penalty';
  }

  findAll() {
    return this.prisma.penalty.findMany();
  }

  findOne(id: number) {
    return this.prisma.penalty.findUnique({ where: { id } });
  }

  update(id: number, updatePenaltyDto: UpdatePenaltyDto) {
    return `This action updates a #${id} penalty`;
  }

  remove(id: number) {
    return `This action removes a #${id} penalty`;
  }
}
