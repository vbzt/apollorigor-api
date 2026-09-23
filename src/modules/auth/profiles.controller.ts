import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Admin } from '../../common/decorators/access.decorator.js';
import { PageDto, pagination } from '../../common/dto/page.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
@ApiTags('Profiles')
@ApiBearerAuth()
@Admin()
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly prisma: PrismaService) {}
  @Get() list(@Query() query: PageDto) {
    return this.prisma.profile.findMany({
      where: { role: 'CLIENT' },
      orderBy: { createdAt: 'desc' },
      ...pagination(query),
    });
  }
}
