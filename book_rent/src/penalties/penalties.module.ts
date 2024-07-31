import { Module } from '@nestjs/common';
import { PenaltiesService } from './penalties.service';
import { PenaltiesController } from './penalties.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PenaltiesController],
  providers: [PenaltiesService, PrismaService],
})
export class PenaltiesModule {}
