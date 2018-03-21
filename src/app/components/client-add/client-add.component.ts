import { Component, OnInit, ViewChild } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';

import { Router } from '@angular/router';

import { Client } from '../../models/Client';
import { Settings } from '../../models/Settings';


@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {
  //Declare properties
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  //boolean to ensure can't add balance to new client
  //set to settings service boolean via custom method
  disableBalanceOnAdd: boolean;

  //Set ViewChild clientForm
  @ViewChild('clientForm') form: any


  constructor(private flashMessage: FlashMessagesService, 
              private clientService: ClientService, 
              private settingsService: SettingsService,
              private router: Router) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAddd;
  }

  onSubmit({value, valid}: {value:Client, valid:boolean}){
    //if balance is disabled, we need to ensure that the new client will have a balance assigned
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }

    //Check if client is valid
    if(!valid){
      //Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else{
      //Add new client
      this.clientService.newClient(value)
      //Show message
      this.flashMessage.show('New Client Added', {
        cssClass: 'alert-success', timeout: 4000
      });
      //redirect to dashboard
      this.router.navigate(['/'])
    }
  }

}
