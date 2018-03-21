import { Injectable } from '@angular/core';

import { Settings } from '../models/Settings';

@Injectable()
export class SettingsService {
  //declare properties
  settings: Settings ={
    allowRegistration: true,
    disableBalanceOnAddd: true,
    disableBalanceOnEdit: true
  }

  constructor() { 

    //set properties in local storage
    if(localStorage.getItem('settings')!=null){
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  //Get Settings
  getSettings(): Settings {
    return this.settings;
  }

  //Change Settings
  changeSettings(settings: Settings){
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
