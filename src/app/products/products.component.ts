import { CategoryService } from './../category.service';
import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  categories$;

  constructor(
    productService: ProductService,
    categoryService: CategoryService
  ) {
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getAll();
  }
}
