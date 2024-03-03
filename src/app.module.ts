import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { DrinkModule } from './drink/drink.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [MenuModule, DrinkModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
