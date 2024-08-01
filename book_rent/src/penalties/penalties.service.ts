import { Injectable } from '@nestjs/common';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { UpdatePenaltyDto } from './dto/update-penalty.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PenaltiesService {
  constructor(private prisma: PrismaService) {}
  create(createPenaltyDto: CreatePenaltyDto) {
    return this.prisma.penalty.create({ data: createPenaltyDto });
  }

  findAll() {
    return this.prisma.penalty.findMany();
  }

  findOne(memberId: number) {
    return this.prisma.penalty.findMany({ where: { memberId } });
  }

  async update(id: number, updatePenaltyDto: UpdatePenaltyDto) {
    const updatePenalty = await this.prisma.penalty.update({ where: { id }, data: updatePenaltyDto });

    return {
      success: true,
      message: 'Penalty updated successfully',
      data: updatePenalty
    }
  }

  async remove(id: number) {
    const deletePenalty = await this.prisma.penalty.delete({ where: { id } });
    
    return {
      success: true,
      message: 'Penalty deleted successfully',
      data: deletePenalty
    }
  }
}
