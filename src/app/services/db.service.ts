import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { createConnection, ConnectionOptions } from 'typeorm';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private platform: Platform) { }

  initialize() {
    let connectOptions: ConnectionOptions;
    connectOptions = {
      type: 'cordova',
      database: '__vcitemobile',
      location: 'default'
    };
    // if (this.platform.is('cordova')) {
    // } else {
    //   connectOptions = {
    //     type: 'sqljs',
    //     location: 'browser',
    //     logging: true
    //   };
    // }

    console.log('isCordova', this.platform.is('cordova'));

    createConnection(connectOptions)
      .then(connection => {
        console.log(connection);
      }, error => {
        console.log(error);
      })
  }


}
