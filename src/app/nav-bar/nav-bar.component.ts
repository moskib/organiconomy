import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  public isCollapsed = false;
  
  constructor(public auth: AuthService) { 
  }

  logout() {
    this.auth.logout();
  }

}
