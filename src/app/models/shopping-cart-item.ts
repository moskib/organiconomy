import { AppProduct } from './app-product';

export class ShoppingCartItem {
  key: string;
  product: AppProduct;
  quantity: number;

  get totalPrice() {
    return this.product.value.price * this.quantity;
  }
}
