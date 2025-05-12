import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { ApartmentRepository } from './apartment.repository';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ApartmentController],
  providers: [ApartmentService, ApartmentRepository, PrismaService],
})
export class ApartmentModule {}
