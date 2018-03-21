import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { SettingsService } from '../../services/settings.service';

import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  //decalre properties 
  settings: Settings;

  constructor(
    private settingsService: SettingsService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    //will return all settings from setting service
    this.settings = this.settingsService.getSettings();
  }

  //on submition of the settings form
  onSubmit(){
    //this.settings is bound to the form via [checked]
    this.settingsService.changeSettings(this.settings);
    this.flashMessage.show('Settings saved', {
      cssClass: 'alert-success', timeout: 4000
    });
  }

}
