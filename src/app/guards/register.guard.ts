import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';

import { SettingsService} from '../services/settings.service';

@Injectable()
export class RegisterGuard implements CanActivate {

  constructor(
    private router: Router,
    private settingsService: SettingsService
  ){}

  //CanActivate requires canActive method to be called 
  //attach canActivate to route we want to protect
  canActivate():boolean {
   if(this.settingsService.getSettings().allowRegistration){
    return true;
   } else {
    this.router.navigate(['/login']);
    return false;
   }
   
  }

}