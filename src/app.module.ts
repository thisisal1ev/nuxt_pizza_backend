import { Module } from '@nestjs/common';

import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { IngredientsController } from './ingredients/ingredients.controller';
import { IngredientsService } from './ingredients/ingredients.service';
import { PrismaService } from './prisma.service';
import { StoriesController } from './stories/stories.controller';
import { StoriesService } from './stories/stories.service';

@Module({
  imports: [],
  controllers: [CategoriesController, StoriesController, IngredientsController],
  providers: [
    CategoriesService,
    PrismaService,
    StoriesService,
    IngredientsService,
  ],
})
export class AppModule {}
