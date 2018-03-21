import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';

import { AngularFireAuth} from 'angularfire2/auth';

import { Observable } from 'rxjs/observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ){}

  //CanActivate requires canActive method to be called 
  //attach canActivate to route we want to protect
  canActivate(): Observable<boolean> {
    return this.afAuth.authState.map(auth => {
      if(!auth){
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    });
  }

}