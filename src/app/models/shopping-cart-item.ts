export class ShoppingCartItem {
  key: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;

  get totalPrice() {
    return this.price * this.quantity;
  }
}
