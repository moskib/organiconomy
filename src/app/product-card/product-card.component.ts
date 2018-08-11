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

  constructor(private cartService: ShoppingCartService) {}

  addToCart(product: AppProduct) {
    this.addToCart(product);
  }
}
