import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UploadedFiles,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('apartments')
export class ApartmentController {
  constructor(private readonly service: ApartmentService) {}

  @Post()
  create(@Body() dto: CreateApartmentDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateApartmentDto) {
    return this.service.update(+id, dto);
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    const urls = files.map(
      (file) => `http://localhost:3001/uploads/${file.filename}`,
    );
    return { urls };
  }

  @Get('search')
  search(
    @Query('unitName') unitName?: string,
    @Query('unitNumber') unitNumber?: string,
    @Query('project') project?: string,
  ) {
    return this.service.findWithFilters({ unitName, unitNumber, project });
  }
}
