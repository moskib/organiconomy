import { AuthService } from 'shared/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  // Used to get the authentication status of
  //  the current user. If the user is logged
  // in, the service will return true. Otherwise,
  // the service will navigate to the login page.
  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(
      map(user => {
        if (user) return true;

        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      })
    );
  }
}
