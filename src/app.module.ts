import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { DrinkModule } from './drink/drink.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MenuModule, DrinkModule, OrderModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
