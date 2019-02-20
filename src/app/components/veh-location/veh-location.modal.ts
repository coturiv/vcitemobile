import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSearchbar, AlertController } from '@ionic/angular';
import { Location } from 'src/app/entities';
import { getRepository, Like, createQueryBuilder, Not } from 'typeorm';

@Component({
  selector: 'veh-location-modal',
  templateUrl: './veh-location.modal.html',
  styleUrls: ['./veh-location.modal.scss'],
})
export class VehLocationModal implements OnInit {
  streets: Location[];
  streetUnits: Location[];

  selected: Location;

  readonly pageSize: number = 15;
  currentPageIdx: number = 0;

  @ViewChild(IonSearchbar)
  searchbar: IonSearchbar;

  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.loadSteets();
  }

  async close(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  async search(_) {
    const searchText = this.searchbar.value;
    await this.loadSteets(this.pageSize, this.currentPageIdx, searchText);
  }

  async create() {
    
    const alert = await this.alertCtrl.create({
      header: 'Create Street',
      inputs: [{
        name: 'street',
        value: this.searchbar.value,
        type: 'text',
        placeholder: 'Street'
      }, {
        name: 'unit',
        type: 'number',
        placeholder: 'Unit #'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Ok',
        handler: async data => {
          const street = new Location();

          Object.assign(street, data);

          try {
            const created = await street.save();
            this.close(created);
          } catch (e) {
            console.log(e);
          }
        }
      }]
    });

    alert.present();
  }

  private async loadSteets(limit: number = 15, skip: number = 0, filter?: string) {
    const queryBuilder = createQueryBuilder('location')
      .select('DISTINCT (location.street)')
      .orderBy('street')
      .skip(skip)
      .limit(limit);
    
    if (filter) {
      queryBuilder.where({
        name: Like(`${filter}%`)
      });
    };

    this.streets = await queryBuilder.getRawMany() as Location[];
  }

  private async loadStreetUnits(streetName: string) {
    return await getRepository('location').find({
      street: Like(`%${streetName}%`),
      unit: Not('')
    }) as Location[];
  }

  async itemSelected(street: Location) {
    this.selected = street;
    this.streetUnits = await this.loadStreetUnits(street.street);
  }
}
