import { Module } from '@nestjs/common';

import { CategoriesModule } from './categories/categories.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { ProductsModule } from './products/products.module';
import { StoriesModule } from './stories/stories.module';

@Module({
  imports: [StoriesModule, ProductsModule, IngredientsModule, CategoriesModule],
})
export class AppModule {}
