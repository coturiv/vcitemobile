import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vchalk',
  templateUrl: './vchalk.page.html',
  styleUrls: ['./vchalk.page.scss'],
})
export class VchalkPage implements OnInit {
  vchalk = 'assets/pdfs/lynnpark_vcitemobile_vchalk_info.pdf';

  constructor() { }

  ngOnInit() {
  }

}
