import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { DrinkModule } from './drink/drink.module';

@Module({
  imports: [MenuModule, DrinkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
