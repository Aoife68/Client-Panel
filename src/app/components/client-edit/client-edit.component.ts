import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/Client';

import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  //declare properties
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }
  disableBalanceOnEdit: boolean;

  constructor(
    private clientService: ClientService,
    private settingsService: SettingsService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    //Get if from Url
    this.id = this.route.snapshot.params['id'];

    //Get the client
    this.clientService.getClient(this.id).subscribe(client => this.client = client);

    //set editablity of balance
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}){
     if(!valid){
      this.flashMessage.show('Please fill form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      //Add ID to client
      value.id = this.id;

      //update client
      this.clientService.updateClient(value);
      this.flashMessage.show('Cliented Updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/client/' + this.id]);
    }

  }

}
