import { Injectable } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';

import { createConnection, ConnectionOptions, getConnection, getManager, getRepository } from 'typeorm';

import { EntityFactory, VehColor, Citation, VehState, VehMake, Location, Attachment, AttachmentType, PlateType, Violation } from '../entities';
import { StorageKeys, DefaultValues } from '../utility/constant';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  get isDbSynchronized() {
    return localStorage.getItem(StorageKeys.DB_IS_SYNCHRONZIED) == 'true';
  }

  set isDbSynchronized(synchronzied: boolean) {
    localStorage.setItem(StorageKeys.DB_IS_SYNCHRONZIED, String(synchronzied));
  }
  
  constructor(
    private platform: Platform,
    private httpClient: HttpClient,
    private loadingCtrl: LoadingController) { }

  async ready() {
    try {

      getConnection();

    } catch(ex) {
      
      await this.createConnection();

    }
  }

  /**
   * Synchronization
   * 
   * @param entities 
   */
  async synchronize(entities: any[]) {
    const loading = await this.loadingCtrl.create({
      message: 'initializing database...'
    });

    try {
      await getManager().transaction(async tem => {
        loading.present();

        for (const entity of entities) {
          const tableName = entity.name.toLowerCase();
          const records = await this.httpClient.get(`assets/data/${tableName}.json`)
            .pipe(
              catchError(_=> of([])),
              map((items: Object[]) => {
                switch(entity) {
                  case Attachment:
                    return items.map(i => Object.assign(new Attachment(), i));
                  case AttachmentType:
                    return items.map(i => Object.assign(new AttachmentType(), i));
                  case Citation:
                    return items.map(i => Object.assign(new Citation(), i));
                  case Location:
                    return items.map(i => Object.assign(new Location(), i));
                  case PlateType:
                    return items.map(i => Object.assign(new PlateType(), i));
                  case VehColor:
                    return items.map(i => Object.assign(new VehColor(), i));
                  case VehMake:
                    return items.map(i => Object.assign(new VehMake(), i));
                  case VehState:
                    return items.map(i => Object.assign(new VehState(), i));
                  case Violation:
                    return items.map(i => Object.assign(new Violation(), i));
                }
              })
            )
            .toPromise() as any[];

          if (records.length) {

            await tem.clear(entity);
            await tem.save(records);
          
          }
        }

        await this.initializeDb();

        loading.dismiss();
      });
    } catch (e) {
      console.log(e);
      loading.dismiss();
    }
  }

  async initializeDb() {
    let defaultCitation = await getRepository(Citation).findOne(DefaultValues.DB_CITATION_ID);

    if (defaultCitation) {
      // TODO: update default citation after a new synchronzation completed.
    } else {
      defaultCitation = new Citation();
      defaultCitation.id = DefaultValues.DB_CITATION_ID;
      defaultCitation.vehicle_state = await getRepository(VehState).findOne();
      defaultCitation.vehicle_color = await getRepository(VehColor).findOne();
      defaultCitation.vehicle_make = await getRepository(VehMake).findOne();

      const location = new Location();
      location.street = '';
      location.source = 'input';

      defaultCitation.location = location;

      await defaultCitation.save();
    }
  }

  
  /**
   * Create DB connection
   */
  private async createConnection(){
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

    try {

      await createConnection(dbOptions);

    } catch(e) {

      console.log('Create connection failed.', e);

    }

    if (!this.isDbSynchronized) {
      await this.synchronize([VehColor, VehMake, VehState, Location, Violation]);

      this.isDbSynchronized = true;
    }
  }
}
