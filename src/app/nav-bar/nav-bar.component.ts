import { AppUser } from './../models/app-user';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isCollapsed = false;
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => (this.appUser = appUser));

    const cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (const productId in cart.items)
        this.shoppingCartItemCount += cart.items[productId].quantity;
    });
  }

  logout() {
    this.auth.logout();
  }
}
