import { Module } from '@nestjs/common';

import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService],
})
export class AppModule {}
