import { Injectable } from '@nestjs/common';
import { ApartmentRepository } from './apartment.repository';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

@Injectable()
export class ApartmentService {
  constructor(private readonly repo: ApartmentRepository) {}

  create(dto: CreateApartmentDto) {
    return this.repo.create({
      unitName: dto.unitName,
      unitNumber: dto.unitNumber,
      project: dto.project,
      price: dto.price,
      images: dto.images,
    });
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  update(id: number, dto: UpdateApartmentDto) {
    return this.repo.update(id, {
      unitName: dto.unitName,
      unitNumber: dto.unitNumber,
      project: dto.project,
      price: dto.price,
      images: dto.images,
    });
  }
}
