import { Component, OnInit, forwardRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VehLocationModal } from './veh-location.modal';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'veh-location',
  template: `
    <ion-input readonly="true" value="Los Angels" (ionFocus)="onFocus()" text-end>
  `,
  styles: [],
  providers: [
    { provide: NG_VALUE_ACCESSOR,  useExisting: forwardRef(() => VehLocationComponent),  multi: true }
  ]
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
