import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';

import { Client } from '../../models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit { 
  //Declare properties
  clients: Client[];
  totalOwed: number;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    //Get clients from client service
    this.clientService.getClients().subscribe(clients => {
      //assign value derived from service to component property
      this.clients = clients;
      this.getTotalOwed();
    });
    
  }

  //Get total owed
  //Using a higher order array method reduce - (a foreach loop could be used alternatively)
  getTotalOwed(){
    //reduce works similarly to forEach 
    //reduce takes in two parameters, client is used as the iterator
    this.totalOwed = this.clients.reduce((total, client) => {
      //client balance was returning a string like value and concatonating rather than adding
      //unknown reason for this, but by parsing to float and setting toString method it worked
      return total + parseFloat(client.balance.toString());
    }, 0);
  }  
}
