import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { Citation } from 'src/app/models/citation';

@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.page.html',
  styleUrls: ['./qrscan.page.scss'],
})
export class QrscanPage implements OnInit {
  citation: Citation;

  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }

  onScan() {
    this.barcodeScanner.scan().then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

}
