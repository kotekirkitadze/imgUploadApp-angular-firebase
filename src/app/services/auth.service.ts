import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<any>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  logIn(email, password) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  signOut() {
    return from(this.afAuth.signOut());
  }

  getAuthUser(): Observable<any> {
    return this.user;
  }
}
