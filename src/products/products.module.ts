import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  exports: [ProductsService],
  providers: [ProductsService, PrismaService],
  controllers: [ProductsController],
})
export class ProductsModule {}
