import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('all')
  getAll() {
    return this.productsService.getAll();
  }

  @Get('search')
  search(@Query('query') query: string) {
    return this.productsService.search(query);
  }
}
