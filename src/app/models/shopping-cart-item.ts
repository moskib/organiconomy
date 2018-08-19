import { AppProduct } from './app-product';

export class ShoppingCartItem {
  key: string;
  value: {
    title: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;

  get totalPrice() {
    return this.value.price * this.quantity;
  }
}
