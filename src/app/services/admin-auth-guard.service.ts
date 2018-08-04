import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.userService.get(user.uid).valueChanges();
      })).pipe(
        map(appUser => appUser.isAdmin)
      );
  }
}