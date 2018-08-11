import { AppProduct } from './app-product';

export interface ShoppingCartItem {
  key: string;
  product: AppProduct;
  quantity: number;
}
