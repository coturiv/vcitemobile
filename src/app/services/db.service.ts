import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { createConnection, ConnectionOptions, getConnection, Connection } from 'typeorm';

import { EntityFactory } from '../entity';
import { AssetsService } from './assets.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  
  private get isFirstRun() {
    return localStorage.getItem('is_first_run') == 'true';
  } 

  private set isFirstRun(val: boolean) {
    localStorage.setItem('is_first_run', String(val));
  }
  
  constructor(private platform: Platform, private assetService: AssetsService) { }

  async ready() {
    try {

      await getConnection();

    } catch(ex) {
      console.log('Connection not initialized.', ex);

      await this.initialize();

    }
  }

  /**
   * Initialize DB
   */
  public async initialize() {
    try {
      const connection = await this.createConnection();
      await connection.synchronize();

      if (!this.isFirstRun) {
        try {
          await connection.transaction(async tem => {
            const vehColors = await this.assetService.getVehColors();
            await tem.save(vehColors);

            const vehStates = await this.assetService.getVehStates();
            await tem.save(vehStates);

            const vehMakes = await this.assetService.getVehMakes();
            await tem.save(vehMakes);
            
            this.isFirstRun = true;
          });
        } catch(ex) {
          console.log('Transaction failed.', ex);
        }
      }

    } catch(ex) {

      console.log('Connection failed.', ex);

    }
  }

  /**
   * Create DB connection
   */
  private createConnection(): Promise<Connection> {
    let dbOptions: ConnectionOptions;
    
    if (this.platform.is('cordova')) {

      dbOptions = {
        type: 'cordova',
        database: '__vcitemobile',
        location: 'default'
      };
    } else {

      dbOptions = {
        type: 'sqljs',
        location: 'browser',
        synchronize: true,
        autoSave: true
      };
    }

    // additional options
    Object.assign(dbOptions, {
      // logging: true,
      entities: EntityFactory.getAllEntities()
    });

    return createConnection(dbOptions);
  }

}
