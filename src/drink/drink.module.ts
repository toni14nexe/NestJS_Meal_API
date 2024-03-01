import { Module } from '@nestjs/common';
import { DrinkController } from './drink.controller';
import { DrinkService } from './drink.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DrinkController],
  providers: [DrinkService, PrismaService],
})
export class DrinkModule {}
