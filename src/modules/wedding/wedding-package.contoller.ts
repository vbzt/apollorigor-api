import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Admin } from '../../common/decorators/access.decorator.js';
import { WeddingPackageService } from './wedding-package.service.js';
import { CreateWeddingPackageDto } from './dto/create-wedding.dto.js';

@ApiTags('Wedding Packages')
@ApiBearerAuth()
@Controller('wedding-packages')
export class WeddingPackageController {
  constructor(private readonly service: WeddingPackageService) {}

  @Get(':id')
  getSummary(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.getSummary(id);
  }

  @Admin()
  @Post()
  create(@Body() dto: CreateWeddingPackageDto) {
    return this.service.create(dto);
  }
}