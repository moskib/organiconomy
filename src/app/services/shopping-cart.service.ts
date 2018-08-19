import { ShoppingCart } from './../models/shopping-cart';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AppProduct } from '../models/app-product';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db
      .object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(
        map((cart: any) => {
          const key = cart.key;
          const items = cart.payload.val().items;
          return new ShoppingCart(key, items);
        })
      );
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: AppProduct) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: AppProduct) {
    this.updateItem(product, -1);
  }

  private async updateItem(product: AppProduct, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);

    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        item$.update({
          value: {
            title: product.value.title,
            imageUrl: product.value.imageUrl,
            price: product.value.price
          },

          quantity:
            (item.payload.exists() ? item.payload.val().quantity : 0) + change
        });
      });
  }
}
