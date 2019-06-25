import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSearchbar, AlertController } from '@ionic/angular';
import { Location } from 'src/app/entities';
import { getRepository, Like, createQueryBuilder, Not } from 'typeorm';
import { StorageKeys } from 'src/app/utility/constant';
import { NotifyService } from 'ionic4-kits';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.modal.html',
  styleUrls: ['./location-list.modal.scss'],
})
export class LocationListModal implements OnInit {
  locations: Location[];
  streetNumbers: Location[];
  streetUnits: Location[];

  selected: Location;
  lastUpdated: Date;

  @ViewChild(IonSearchbar)
  searchbar: IonSearchbar;

  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController, private notifyService: NotifyService) { }

  async ngOnInit() {
    this.loadLocations();

    const syncData = JSON.parse(localStorage.getItem(StorageKeys.DB_SYNCHRONIZED));
    this.lastUpdated = syncData.updatedTime;
  }

  async close(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  async confirm() {
    if (!this.selected.StreetNumber && this.streetNumbers.length > 0) {
      this.notifyService.showNotify('This address has multiple street numbers, please select a correct one.', 'warning', false, 3000);
      return;
    }

    if (!this.selected.Unit && this.streetUnits.length > 0) {
      this.notifyService.showNotify('This address has multiple street numbers, please select a unit.', 'warning', false, 3000);
      return;
    }

    await this.close(this.selected);
  }

  async search(_) {
    const searchText = this.searchbar.value;
    await this.loadLocations(searchText);
  }

  async create() {

    const alert = await this.alertCtrl.create({
      header: 'Create Street',
      inputs: [{
        name: 'Street',
        value: this.searchbar.value,
        type: 'text',
        placeholder: 'Street'
      }, {
        name: 'Street Number',
        type: 'number',
        placeholder: 'Street #'
      }, {
        name: 'Unit',
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

  private async loadLocations(filter?: string) {

    const queryBuilder = createQueryBuilder('location')
      .select('DISTINCT (location.Street)')
      // .where({source: 'picker'})
      .orderBy('Street');

    if (filter) {
      queryBuilder.where({
        Street: Like(`${filter}%`)
      });
    } else {
      queryBuilder.where({
        Street: Not('')
      });
    }

    this.locations = await queryBuilder.getRawMany() as Location[];
  }

  private async loadStreetNumbers(street: string) {
    return await getRepository('location').find({
      Street: street,
      StreetNumber: Not('')
    }) as Location[];
  }

  private async loadStreetUnits(location: Location) {
    return await getRepository('location').find({
      Street: location.Street,
      SreetNumber: location.StreetNumber,
      Unit: Not('')
    }) as Location[];
  }

  async onStreetSelected(location: Location) {
    this.selected = location;
    this.selected.StreetNumber = null;
    this.streetNumbers = await this.loadStreetNumbers(location.Street);
  }

  async onStreetNumberSelected(location: Location) {
    this.selected = location;
    this.selected.Unit = null;
    this.streetUnits = await this.loadStreetUnits(location);
  }
}

