import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Admin,
  CurrentUser,
} from '../../common/decorators/access.decorator.js';
import type { Profile } from '../../generated/prisma/client.js';
import { PageDto } from '../../common/dto/page.dto.js';
import { TransactionsService } from './transactions.service.js';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
  ReturnDto,
} from './dto/transaction.dto.js';
@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}
  @Get() list(@CurrentUser() user: Profile, @Query() query: PageDto) {
    return this.service.list(user, query);
  }
  @Admin() @Get('conflicts') conflicts() {
    return this.service.conflicts();
  }
  @Get(':id') one(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: Profile,
  ) {
    return this.service.one(id, user);
  }
  @Admin() @Post() create(@Body() dto: CreateTransactionDto) {
    return this.service.create(dto);
  }
  @Admin() @Patch(':id') update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTransactionDto,
  ) {
    return this.service.update(id, dto);
  }
  @Admin() @Post(':id/confirm') confirm(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.service.confirm(id);
  }
  @Admin() @Post(':id/cancel') cancel(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.cancel(id);
  }
  @Admin() @Post(':id/pickup') pickup(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.pickup(id);
  }
  @Admin() @Post(':id/return') returnItem(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ReturnDto,
  ) {
    return this.service.complete(id, 'return', dto.damageNotes);
  }
  @Admin() @Post(':id/deliver') deliver(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.service.complete(id, 'deliver');
  }
  @Post(':id/checkout') checkout(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: Profile,
  ) {
    return this.service.checkout(id, user);
  }
}
