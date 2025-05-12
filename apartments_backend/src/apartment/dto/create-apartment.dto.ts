import { IsString, IsInt, IsArray, IsNumber } from 'class-validator';

export class CreateApartmentDto {
  @IsString()
  unitName: string;

  @IsInt()
  unitNumber: number;

  @IsString()
  project: string;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  images: string[];
}
