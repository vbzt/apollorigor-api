import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public, Admin } from '../../common/decorators/access.decorator.js';
import { PageDto } from '../../common/dto/page.dto.js';
import { ProductsService } from './products.service.js';
import {
  CreateProductDto,
  UpdateProductDto,
  AvailabilityDto,
} from './dto/product.dto.js';
@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}
  @Public() @Get() list(@Query() query: PageDto) {
    return this.service.list(query);
  }
  @Admin() @Get('admin/all') all(@Query() query: PageDto) {
    return this.service.list(query, true);
  }
  @Public() @Get(':id') one(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.one(id);
  }
  @Public()
  @Get(':id/variants/:variantId/availability')
  availability(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('variantId', ParseUUIDPipe) variantId: string,
    @Query() query: AvailabilityDto,
  ) {
    return this.service.availability(
      id,
      variantId,
      query.startDate,
      query.endDate,
    );
  }
  @Admin() @Post() create(@Body() dto: CreateProductDto) {
    return this.service.create(dto);
  }
  @Admin() @Patch(':id') update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.service.update(id, dto);
  }
  @Admin() @Delete(':id') deactivate(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.deactivate(id);
  }
}
