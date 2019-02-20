import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VehLocationModal } from './veh-location.modal';

@Component({
  selector: 'veh-location',
  template: `
    <ion-input readonly="true" value="Los Angels" (ionFocus)="onFocus()" text-end>
  `,
  styles: []
})
export class VehLocationComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async onFocus() {
    const modal = await this.modalCtrl.create({
      component: VehLocationModal
    });

    modal.present();
  }

}
