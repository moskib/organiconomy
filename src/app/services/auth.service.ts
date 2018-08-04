import { Observable } from 'rxjs';
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
    private router: Router) {
    this.user$ = afAuth.authState;
  }

  login() {
    // get the query parameter (if not, it will rederect to home)
    let returnUrl = this.route.snapshot
      .queryParamMap.get('returnUrl') || '/';

    // Notice I used signInWithPopup() instead of
    // signInWithRedirect()
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => this.router.navigateByUrl(returnUrl));
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
