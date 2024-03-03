export interface MenuItem {
  passenger?: string;
  menuId: number;
  menuTitle: string;
  starter?: string;
  desert?: string;
  price: number;
  menuImageUrl?: string;
  drinkId: number;
  drinkTitle: string;
  drinkImageUrl?: string;
}

export interface Order {
  id?: number;
  menu: MenuItem[];
  createdAt?: Date;
  updatedAt?: Date;
}
