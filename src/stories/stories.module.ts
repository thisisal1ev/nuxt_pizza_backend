import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';

@Module({
  exports: [StoriesService],
  controllers: [StoriesController],
  providers: [StoriesService, PrismaService],
})
export class StoriesModule {}
