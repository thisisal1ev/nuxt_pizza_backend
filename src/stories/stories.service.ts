import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getStories() {
    return this.prisma.story.findMany({
      include: {
        items: true,
      },
    });
  }
}
