import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

import { ParamsDto } from './dto/params.dto';
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

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProduct(id);
  }

  @Get()
  getFilteredPizzas(@Query() params: ParamsDto) {
    return this.productsService.getFilteredPizzas(params);
  }
}
