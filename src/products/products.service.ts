import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { ParamsDto } from './dto/params.dto';
import { conversionToArr } from './utils/conversionToArr';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  getProduct(id: number) {
    if (id < 1) {
      throw new BadRequestException('Invalid ID');
    }

    const product = this.prisma.product.findFirst({
      where: {
        id: id,
      },
      include: {
        ingredients: true,
        category: {
          include: {
            products: {
              include: {
                items: true,
              },
            },
          },
        },
        items: true,
      },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    return product;
  }

  getAll() {
    return this.prisma.product.findMany();
  }

  async getFilteredPizzas(params: ParamsDto) {
    const DEFAULT_MIN_PRICE = 0;
    const DEFAULT_MAX_PRICE = 1000;

    const sizes = conversionToArr(params.sizes);
    const pizzaTypes = conversionToArr(params.pizzaTypes);
    const ingredientsIdArr = conversionToArr(params.ingredients);
    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    const categories = await this.prisma.category.findMany({
      include: {
        products: {
          orderBy: {
            id: 'desc',
          },
          where: {
            name: {
              contains: params.query,
              mode: 'insensitive',
            },
            ingredients: ingredientsIdArr
              ? {
                  some: {
                    id: {
                      in: ingredientsIdArr,
                    },
                  },
                }
              : undefined,
            items: {
              some: {
                size: {
                  in: sizes,
                },
                pizzaType: {
                  in: pizzaTypes,
                },
                price: {
                  gte: minPrice, // >=
                  lte: maxPrice, // <=
                },
              },
            },
          },
          include: {
            ingredients: true,
            items: {
              where: {
                price: {
                  gte: minPrice,
                  lte: maxPrice,
                },
              },
              orderBy: {
                price: 'asc',
              },
            },
          },
        },
      },
    });

    return categories.filter((category) => category.products.length > 0);
  }

  search(query: string) {
    return this.prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: 5,
    });
  }
}
