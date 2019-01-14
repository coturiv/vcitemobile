import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { QrscanPage } from '../qrscan/qrscan';

@Component({
  selector: 'page-citations',
  templateUrl: 'citations.html'
})
export class CitationsPage {
	
	params: any[] = [];
  cid: any;
  sn: any;
  citations: any[] = [];
  selectedCitation: any;
  citationFound:boolean = false;
  errorMessage: any;
	
  constructor(public navCtrl: NavController,
    public dataService: DataServiceProvider,
    private sqlite: SQLite) {
      
  }

  getCitations() {
    this.dataService.getCitations()
      .subscribe(
        citations => this.citations = citations,
        error => this.errorMessage = <any>error);
  }

  goToQrScan(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(QrscanPage);
  }
  
  goToTabsController(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(TabsControllerPage);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CitationsPage');
    this.getCitations();
  }
}
