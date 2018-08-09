import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppProduct } from '../../models/app-product';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  filteredProducts: any[];
  subscription: Subscription;
  dataSource: MatTableDataSource<AppProduct>;
  displayedColumns = ['title', 'price', 'edit'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) {
  }

  filter(query: string) {
    this.dataSource.filter = query;
  }

  ngOnInit() {
    this.subscription = this.productService.getAll().subscribe(product => {
      this.dataSource = new MatTableDataSource(product);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data: AppProduct, filter: string) => data.value.title.toLowerCase().includes(filter.toLowerCase());
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}