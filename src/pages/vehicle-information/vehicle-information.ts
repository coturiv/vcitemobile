import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-vehicle-information',
  templateUrl: 'vehicle-information.html'
})
export class VehicleInformationPage {

  citationSN: any;
  states: any[] = [];
  vehicleColors: any[] = [];
  vehicleMakes: any[] = [];
  vehicleData: any[] = [];
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public dataService: DataServiceProvider,
    public navParams: NavParams,
    private sqlite: SQLite) {
      console.log("navParams-sn: " + this.navParams.get('sn'));
      console.log("navParams-cid: " + this.navParams.get('cid'));
      this.citationSN = this.navParams.get('sn');
      console.log('citationSN: ' + this.citationSN);
  }

  getStates() {
    this.dataService.getStates()
      .subscribe(
        states => this.states = states,
        error => this.errorMessage = <any>error);
  }

  getVehicleColors() {
    this.dataService.getVehicleColors()
      .subscribe(
        vehicleColors => this.vehicleColors = vehicleColors,
        error => this.errorMessage = <any>error);
  }

  getVehicleMakes() {
    this.dataService.getVehicleMakes()
      .subscribe(
        vehicleMakes => this.vehicleMakes = vehicleMakes,
        error => this.errorMessage = <any>error);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehicleInformationPage');
    console.log(this.navParams.data);
    this.getStates();
    this.getVehicleColors();
    this.getVehicleMakes();
  }

}
