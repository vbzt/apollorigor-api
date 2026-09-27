import { Module } from '@nestjs/common';
import { WeddingPackageService } from './wedding-package.service.js';
import { WeddingPackageController } from './wedding-package.contoller.js';
@Module({
  providers: [WeddingPackageService],
  controllers: [WeddingPackageController],
})
export class WeddingPackageModule {}