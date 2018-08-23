import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  order$;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const orderId = this.route.snapshot.queryParamMap.get('orderId');
    this.order$ = this.orderService.getOrderById(orderId);
  }
}
