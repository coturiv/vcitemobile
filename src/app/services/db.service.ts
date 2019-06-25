import { Injectable } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';

import { createConnection, ConnectionOptions, getConnection, getManager, getRepository } from 'typeorm';

import {
  EntityFactory,
  VehColor,
  Citation,
  VehState,
  VehMake,
  Location,
  Attachment,
  AttachmentType,
  PlateType,
  Violation
} from '../entities';
import { StorageKeys, DefaultValues } from '../utility/constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  synchronizeChange: Subject<number>;

  constructor(
    private platform: Platform,
    private httpClient: HttpClient,
    private loadingCtrl: LoadingController
  ) {
    this.synchronizeChange = new Subject();
  }


  get isSynchronized() {
    return !!localStorage.getItem(StorageKeys.DB_SYNCHRONIZED);
  }

  /**
   * Synchronization
   *
   * @param entities
   */
  async synchronize(force = false) {

    if (this.isSynchronized && !force) {
      return;
    }

    const entities: any[] = [VehColor, VehMake, VehState, PlateType, Location, Violation];

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
              catchError(_ => of([])),
              map((items: Object[]) => {
                switch (entity) {
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

        localStorage.setItem(StorageKeys.DB_SYNCHRONIZED, JSON.stringify({updatedTime: Date.now()}));

        loading.dismiss();
      });
    } catch (e) {
      console.log(e);
      loading.dismiss();
    }
  }

  async initializeDb() {
    let defaultCitation = await getRepository(Citation).findOne(DefaultValues.CITATION_DEFAULT_ID);

    if (defaultCitation) {
      // TODO: update default citation after a new synchronzation completed.
    } else {
      defaultCitation = new Citation();
      defaultCitation.id = DefaultValues.CITATION_DEFAULT_ID;
      defaultCitation.vehicle_state = await getRepository(VehState).findOne();
      defaultCitation.vehicle_color = await getRepository(VehColor).findOne();
      defaultCitation.vehicle_make = await getRepository(VehMake).findOne();
      defaultCitation.plate_type = await getRepository(PlateType).findOne();

      const location = new Location();
      location.Street = '';
      location.source = 'input';
      location.id = Date.now();

      defaultCitation.location = location;

      await defaultCitation.save();
    }
  }


  /**
   * Create DB connection
   */
  async createConnection() {
    let dbOptions: ConnectionOptions;

    if (this.platform.is('cordova') && this.platform.is('ios')) {

      dbOptions = {
        type: 'cordova',
        database: '__vcitemobile',
        location: 'default'
      };
    } else {
      dbOptions = {
        type: 'sqljs',
        location: 'browser',
        autoSave: true
      };
    } /* else {
      dbOptions = {
        type: 'websql',
        database: '__vcitemobile',
        version: '1',
        description: '',
        size: 2 * 1024 * 1024
      };

    }*/

    // additional options
    Object.assign(dbOptions, {
      logging: false,
      synchronize: true,
      entities: EntityFactory.getAllEntities()
    });

    try {

      await createConnection(dbOptions);

    } catch (e) {

      console.log('Create connection failed.', e);

    }

  }
}
