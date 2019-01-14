import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VehicleInformationPage } from '../vehicle-information/vehicle-information';
import { ViolationDetailsPage } from '../violation-details/violation-details';
import { PhotoEvidencePage } from '../photo-evidence/photo-evidence';
import { ReviewFinishPage } from '../review-finish/review-finish';
import { DataServiceProvider } from '../../providers/data-service/data-service';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
	
	params: any;
  cid: any;
  sn: any;
  citations: any[] = [];
  selectedCitation: any;
  citationFound:boolean = false;
	
  tab1Root: any = VehicleInformationPage;
  tab2Root: any = ViolationDetailsPage;
  tab3Root: any = PhotoEvidencePage;
  tab4Root: any = ReviewFinishPage;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataServiceProvider) {
      //console.log("TabsControllerPage navParams: " + this.navParams);
      this.params = this.navParams.data;
      //console.log("TabsControllerPage navParams.data: " + this.params);
      this.cid = this.navParams.get('cid');
      this.sn = this.navParams.get('sn');
      console.log("TabsControllerPage params cid: " + this.cid);
      console.log("TabsControllerPage params sn: " + this.sn);
      
      this.dataService.getCitations()
        .subscribe((response)=> {
          this.citations = response
          console.log(this.citations);
      });
  }
  
}
