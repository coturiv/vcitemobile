import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
/*import { IonicPage, NavController, NavParams } from 'ionic-angular';*/
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'page-qrscan',
  templateUrl: 'qrscan.html',
})
export class QrscanPage {

  urlParts: any[] = [];
  params: any[] = [];
  cid: any;
  sn: any;
  requestParams: any = {};
  barcodeText: any;
  citations: any[] = [];
  selectedCitation: any;
  urlRaw: any;
  citationFound: any;
  citationStatus: any;
  errorMessage: any;
  
  constructor(public navCtrl: NavController, 
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public dataService: DataServiceProvider) {
      this.dataService.getCitations()
        .subscribe((response)=> {
          this.citations = response
          console.log(this.citations);
      });
  }

  scan() {
    this.selectedCitation = {};
    this.barcodeScanner.scan().then((barcodeData) => {

      this.cid = "N/A";
      this.sn = "N/A";
      this.barcodeText = barcodeData.text;
      this.citationStatus = "NADA!";
      this.citationFound = 0;
      
      console.log("Barcode text: " + barcodeData.text);
      console.log("Barcode format: " + barcodeData.format);
      console.log("Barcode length: " + barcodeData.text.length);

      // stop now if scan was no good, or format wasn't QR_CODE
      if (barcodeData.format === undefined || barcodeData.format != "QR_CODE") {
        this.citationStatus = "Bad scan, or not a valid QR Code.";
        this.citationFound = 2;
        return;
      }
      // check if scanned text contains the vciteplus.com domain, and has a query string
      if (barcodeData.text.length < 50 || barcodeData.text.indexOf("vciteplus.com") < 0 ) {
        this.citationStatus = "Not a Velosum ticket.";
        this.citationFound = 2;
        return;
      }
      if (barcodeData.text.indexOf("?cid") < 0 ) {
        this.citationStatus = "Not a Velosum ticket.";
        this.citationFound = 2;
        return;
      }

      //
      this.urlRaw = barcodeData.text;
      this.urlParts = barcodeData.text.split("?");
      //console.log(this.urlParts[1]);
      this.params = this.urlParts[1].split("&");
      console.log("params before pop: " + this.params);

      this.cid = this.params[0].split("=").pop();
      this.sn = this.params[1].split("=").pop();
      this.requestParams.cid = this.cid;
      this.requestParams.sn = this.sn;
      console.log("params after pop: " + this.requestParams);
      console.log("sn: " + this.sn);
      console.log("cid: " + this.cid);
      this.citationFound = 1;
      this.citationStatus = "New Citation scanned!";

      /*
      this.selectedCitation = this.citations.find(citation => citation.sn === this.sn && citation.cid === this.cid);

      if (this.selectedCitation !== undefined) {
      this.citationFound = true;
      this.citationStatus = "Citation found!";
      console.log(this.selectedCitation);
      } else {
      this.selectedCitation = {};
      this.citationFound = false;
      this.citationStatus = "Citation not found";
      this.toast.show('Citation not found', '5000', 'center').subscribe(
      toast => {
      console.log(toast);
      }
      );
      }
      */

    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
      );
    });
  }
  
  goToTabsController(params) {
    console.log('Sending params to TabsControllerPage: ' + params);
    if (!params) params = this.requestParams;
    this.navCtrl.setRoot(TabsControllerPage, params);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad QrscanPage');
  }

}
