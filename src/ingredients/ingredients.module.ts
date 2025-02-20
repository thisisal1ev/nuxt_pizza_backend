import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';

@Module({
  exports: [IngredientsService],
  providers: [IngredientsService, PrismaService],
  controllers: [IngredientsController],
})
export class IngredientsModule {}
