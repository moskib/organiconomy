import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppProduct } from './../models/app-product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product')
  product: AppProduct;
  // tslint:disable-next-line:no-input-rename
  @Input('show-actions')
  showActions = true;
  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart')
  shoppingCart;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    const item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
}
