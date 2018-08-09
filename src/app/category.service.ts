import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  // getAll() {
  //   return this.db.list('/categories', query => query.orderByChild('name')).valueChanges();
  // }

  getAll() {
    return this.db
      .list('/categories', query => query.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        map(categories =>
          categories.map(category => ({
            key: category.key,
            value: category.payload.val()
          }))
        )
      );
  }
}
