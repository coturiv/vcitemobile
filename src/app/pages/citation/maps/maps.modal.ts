import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { GoogleMaps, GoogleMap, MyLocation } from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-maps-modal',
  templateUrl: './maps.modal.html',
  styleUrls: ['./maps.modal.scss'],
})
export class MapsModal implements OnInit {
  map: GoogleMap;

  constructor(private modalCtrl: ModalController, private platform: Platform) { }

  async ngOnInit() {
    
    await this.platform.ready();
    
    await this.loadMap();
  }

  async close() {
    this.modalCtrl.dismiss();
  }

  loadMap() {
    try {
      this.map = GoogleMaps.create('map_canvas');
      this.map.getMyLocation().then((location: MyLocation) => {
        console.log(location);
      });
    } catch(e) {
      throw 'Unable to load Google Maps.';
    }
  }
}
