import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MenuModule } from './api/v1/menu/menu.module';
import { DrinkModule } from './api/v1/drink/drink.module';
import { OrderModule } from './api/v1/order/order.module';
import { AdminModule } from './api/v1/admin/admin.module';
import { AuthMiddleware } from './api/middleware/auth.middleware';

const authRoutes = [
  'api/v1/drinks',
  'api/v1/menus/:id',
  'api/v1/orders/:id',
  {
    path: 'api/v1/menus',
    method: RequestMethod.POST,
  },
  {
    path: 'api/v1/orders',
    method: RequestMethod.GET,
  },
];

@Module({
  imports: [MenuModule, DrinkModule, OrderModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(...authRoutes);
  }
}
