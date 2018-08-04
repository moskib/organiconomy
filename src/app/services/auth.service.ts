import { AppUser } from './../models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot
      .queryParamMap.get('returnUrl') || '/';

    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(loggedInUser => {

        this.userService.save(loggedInUser.user);

        this.router.navigateByUrl(returnUrl)
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) return this.userService.get(user.uid).valueChanges()

        return of(null);
      }));
  }
}