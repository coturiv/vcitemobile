import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'veh-location',
  template: `
    <ion-input readonly="true" value="Los Angels" text-end>
  `,
  styles: []
})
export class VehLocationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
