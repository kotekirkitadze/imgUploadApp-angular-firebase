import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


@Injectable()
export class AuthenticationGuard implements CanActivate {
  user: Observable<any>;

  constructor(private afAuth: AngularFireAuth,
    private router: Router) {
    this.user = this.afAuth.authState;
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.user.pipe(
      map((auth) => {
        if (!auth) {
          this.router.navigateByUrl('/login');
          return false;
        }
        return true;
      }),
      take(1)
    )
  }
}
