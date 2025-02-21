import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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
