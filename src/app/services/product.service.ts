import { AppProduct } from 'shared/models/app-product';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(
        map(products => {
          return products.map((product: any) => {
            const payLoad = product.payload.val();
            return {
              key: product.key,
              title: payLoad.title,
              imageUrl: payLoad.imageUrl,
              price: payLoad.price,
              category: payLoad.category
            };
          });
        })
      );
  }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
