import { Injectable } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';

import { createConnection, ConnectionOptions, getConnection, Connection } from 'typeorm';

import { EntityFactory, VehColor, Citation, VehState, VehMake } from '../entities';
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
  
  constructor(private platform: Platform, private assetService: AssetsService, private loadingCtrl: LoadingController) { }

  async ready() {
    try {

      await getConnection();

    } catch(ex) {
      // console.log('Connection not initialized.', ex);

      await this.initialize();

    }
  }

  /**
   * Initialize DB
   */
  public async initialize() {
    try {
      const connection = await this.createConnection();

      if (!this.isFirstRun) {
        try {
          await connection.transaction(async tem => {
            const loading = await this.loadingCtrl.create({
              message: 'Initializing database...'
            });
            loading.present();

            const vehColors = await this.assetService.getVehColors();
            await tem.save(vehColors);
            console.log('vehColor synchronzied');

            const vehStates = await this.assetService.getVehStates();
            await tem.save(vehStates);
            console.log('vehstate synchronzied');

            const vehMakes = await this.assetService.getVehMakes();
            await tem.save(vehMakes);
            console.log('vehmake synchronzied');

            const violations = await this.assetService.getViolations();
            await tem.save(violations);
            console.log('violation synchronzied');

            const streets    = await this.assetService.getLocations();
            await tem.save(streets);
            console.log('location synchronzied');

            loading.dismiss(); 
                      
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
      synchronize:true,
      entities: EntityFactory.getAllEntities()
    });

    return createConnection(dbOptions);
  }

}
