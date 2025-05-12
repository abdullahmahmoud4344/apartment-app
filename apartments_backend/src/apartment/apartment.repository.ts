import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaClient, Apartment, Prisma } from '@prisma/client';

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

  findWithFilters(query: {
    unitName?: string;
    unitNumber?: string;
    project?: string;
  }): Promise<Apartment[]> {
    const { unitName, unitNumber, project } = query;

    return this.prisma.apartment.findMany({
      where: {
        ...(unitName && {
          unitName: { contains: unitName, mode: 'insensitive' },
        }),
        ...(unitNumber && {
          unitNumber: { equals: parseInt(unitNumber, 10) },
        }),
        ...(project && {
          project: { contains: project, mode: 'insensitive' },
        }),
      },
    });
  }
}
