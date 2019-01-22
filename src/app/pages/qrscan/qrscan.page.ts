import { Component, OnInit } from '@angular/core';

import { Citation } from 'src/app/models/citation';

@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.page.html',
  styleUrls: ['./qrscan.page.scss'],
})
export class QrscanPage implements OnInit {
  citation: Citation;

  constructor() { }

  ngOnInit() {
  }

  onScan() {

  }

}
