import { Component, OnInit, HostListener } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { CitationService } from 'src/app/services/citation.service';
import { GoogleMap, GoogleMaps, Geocoder, LocationService } from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  map: GoogleMap;

  constructor(private navCtrl: NavController, private platform: Platform, private citationService: CitationService) { }

  // @HostListener('document:ionBackButton', ['$event'])
  // private overrideHardwareBackAction($event: any) {
  //   $event.detail.register(100, async () => {
  //     // Do what you want
  //     console.log(555);
  //   });
  // }

  ngOnInit() {
    if (this.platform.is('cordova')) {
      this.loadMap();
    } else {
      throw 'cordova_not_avaiable';
    }
  }

  navPop(event: any) {
    this.navCtrl.back();
  }

  async loadMap() {
    try {
      const mylocation = await LocationService.getMyLocation();

      console.log(mylocation);
    } catch(e) {
      console.log(e);
    }

    // this.map = GoogleMaps.create('map_canvas');
    
    
    // const myLocation = await this.map.getMyLocation();
    // if (myLocation) {
    //   this.map.clear();

    //   this.map.animateCamera({
    //     target: myLocation.latLng,
    //     zoom: 18,
    //     tilt: 30
    //   });
    // }
    
  }

}
