import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController, NavController, AlertController } from '@ionic/angular';

import { Citation } from 'src/app/entity/Citation';


export interface ScanResult {
  message?: string,
  status?: 'not_found' | 'invalid' | 'success',
  data?: string
}


@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.page.html',
  styleUrls: ['./qrscan.page.scss'],
})
export class QrscanPage implements OnInit {
  
  scanResult: ScanResult;

  citation: Citation;

  constructor(
    private barcodeScanner: BarcodeScanner, 
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController 
  ) { }

  ngOnInit() {
    this.citation = new Citation();
  }

  async onScan() {

    try {
      this.scanResult = {};
      
      const barcode = await this.barcodeScanner.scan();

      this.scanResult.data = barcode.text;

      // stop now if scan was no good, or format wasn't QR_CODE
      if (!barcode.format || barcode.format != 'QR_CODE') {
        this.scanResult.message = 'Bad scan, or not a valid QR Code.';
        this.scanResult.status = 'invalid';

        return;
      }

      // check if scanned text contains the vciteplus.com domain, and has a query string
      if (this.scanResult.data.length < 50 || !this.scanResult.data.includes('vciteplus.com') || !this.scanResult.data.includes('?cid')) {
        this.scanResult.message = 'Not a Velosum ticket.';
        this.scanResult.status = 'invalid';

        return;
      }

      const {cid, sn} = this.parseParams(this.scanResult.data);
      this.citation.id = cid;
      this.citation.custKey = cid;
      this.citation.serial_number = sn;

      this.scanResult.message = 'New Citation scanned!';
      this.scanResult.status = 'success';

    } catch (e) {

      this.showMessage(e, 'danger');

    }
  }

  /**
   * create a new Citation and navigate to detail page.
   */
  async onContinue() {
    try {
      const citation = await Citation.findOne({id: this.citation.id});
      if (citation) {

        // this.showMessage('Citation exists!', 'danger');

        const alert = await this.alertCtrl.create({
          subHeader: 'Citation exists!',
          message: `A citation with <string>#${this.citation.id}</string> already exists, but you can continue to Citation page as edit mode.`,
          buttons: [{
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'danger'
          }, {
            text: 'Ok',
            handler: () => {
              this.navCtrl.navigateForward(`/citation/${this.citation.id}`);
            }
          }]
        });
        alert.present();

        return;
      }

      await this.citation.save();
      this.navCtrl.navigateForward(`/citation/${this.citation.id}`);
    } catch (e) {
      console.log(JSON.stringify(e));
      
      this.showMessage(e, 'danger');
    }
  }



  /**
   * parse query params from a url
   * 
   * @param url string
   */
  private parseParams(url: string) {
    let match,
    pl     = /\+/g,  // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = (s) => { return decodeURIComponent(s.replace(pl, ' ')); },
    query  = url.split('?').pop();
    
    let urlParams: any = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);

    return urlParams;
  }

  private async showMessage(message: string | any, type?: 'primary' | 'danger') {
    if (typeof message != 'string' ) {
      message = message.message || JSON.stringify(message);
    }

    const toast = await this.toastCtrl.create({
      message: message,
      color: type,
      showCloseButton: true
    });

    toast.present();
  }

}
