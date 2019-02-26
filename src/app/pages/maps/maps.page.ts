import { Component, OnInit, HostListener } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { CitationService } from 'src/app/services/citation.service';
import { GoogleMap, GoogleMaps, Geocoder, LocationService, MyLocation, LatLng, GoogleMapOptions, Marker, GoogleMapsAnimation } from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  map: GoogleMap;
  myLocation: MyLocation; 

  constructor(private navCtrl: NavController, private platform: Platform, private citationService: CitationService) { }

  // @HostListener('document:ionBackButton', ['$event'])
  // private overrideHardwareBackAction($event: any) {
  //   $event.detail.register(100, async () => {
  //     // Do what you want
  //     console.log(555);
  //   });
  // }

  async ngOnInit() {
    if (this.platform.is('cordova')) {
      this.myLocation = await LocationService.getMyLocation();
      console.log(this.myLocation);

      await this.loadMap(this.myLocation.latLng);
    } else {
      throw 'cordova_not_avaiable';
    }
  }

  navPop(event: any) {
    this.navCtrl.back();
  }

  async loadMap(latlng?: LatLng) {
    const mapOptions: GoogleMapOptions = {};
    mapOptions.camera = {
      zoom: 18,
      tilt: 30,
      target: latlng
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    if (latlng) {
      const marker: Marker = await this.map.addMarker({
        position: latlng,
        animation: GoogleMapsAnimation.BOUNCE
      });

      // marker.showInfoWindow();
    }
    
  }

}
