import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};
  id;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute) {
    this.categories$ = this.categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService.get(this.id).pipe(take(1))
        .subscribe(p => this.product = p);
  }

  ngOnInit() {
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }
}
