import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-violation-details',
  templateUrl: 'violation-details.html'
})
export class ViolationDetailsPage {

  violationData: any = {};
  citationSN: any;
  violationList: any[] = [];
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public dataService: DataServiceProvider,
    public navParams: NavParams,
    private sqlite: SQLite) {
      console.log("navParams-sn: " + this.navParams.get('sn'));
      console.log("navParams-cid: " + this.navParams.get('cid'));
      this.citationSN = this.navParams.get('sn');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViolationDetailsPage');
    console.log(this.navParams.data);
    //this.getViolations(this.navParams.get('cid');
  }
  
}
