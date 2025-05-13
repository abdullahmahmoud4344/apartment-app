import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Apartment, Prisma } from '@prisma/client';

@Injectable()
export class ApartmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.ApartmentCreateInput): Promise<Apartment> {
    return this.prisma.apartment.create({ data });
  }

  findAll(): Promise<Apartment[]> {
    return this.prisma.apartment.findMany({
      orderBy: [{ createdAt: 'desc' }, { updatedAt: 'desc' }],
    });
  }

  findOne(id: number): Promise<Apartment | null> {
    return this.prisma.apartment.findUnique({
      where: { id },
    });
  }

  update(id: number, data: Prisma.ApartmentUpdateInput): Promise<Apartment> {
    return this.prisma.apartment.update({
      where: { id },
      data,
    });
  }
}
