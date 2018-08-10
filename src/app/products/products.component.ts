import { switchMap } from 'rxjs/operators';
import { AppProduct } from './../models/app-product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: AppProduct[] = [];
  filteredProducts: AppProduct[] = [];
  category: string;

  constructor(route: ActivatedRoute, productService: ProductService) {
    productService
      .getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = this.category
          ? this.products.filter(p => p.value.category === this.category)
          : this.products;
      });
  }
}
