import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db
      .list('/orders')
      .snapshotChanges()
      .pipe(map(orders => orders.map((order: any) => this.orderMapper(order))));
  }

  getOrderByUser(userId: string) {
    return this.db
      .list('/orders', query => query.orderByChild('userId').equalTo(userId))
      .snapshotChanges()
      .pipe(map(orders => orders.map((order: any) => this.orderMapper(order))));
  }

  getOrderById(orderId: string) {
    return this.db
      .object('/orders/' + orderId)
      .snapshotChanges()
      .pipe(map(order => this.orderMapper(order)));
  }

  private orderMapper(order) {
    const payload = order.payload.val();
    return {
      key: order.key,
      datePlaced: payload.datePlaced,
      items: payload.items,
      shipping: payload.shipping,
      userId: payload.userId
    };
  }
}
