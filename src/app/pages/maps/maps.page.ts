import { Component, OnInit, HostListener } from '@angular/core';
import { NavController, Platform, ActionSheetController, Events } from '@ionic/angular';
import { CitationService } from 'src/app/services/citation.service';
import { GoogleMap, GoogleMaps, Geocoder, LocationService, MyLocation, LatLng, GoogleMapOptions, Marker, GoogleMapsAnimation, GeocoderResult } from '@ionic-native/google-maps/ngx';
import { ActionSheetButton } from '@ionic/core';
import { getRepository } from 'typeorm';
import { Location } from 'src/app/entities';
import { appEvents } from 'src/app/utility/constant';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  map: GoogleMap;
  myLocation: MyLocation; 
  myAddress: string;

  constructor(
    private navCtrl: NavController, 
    private platform: Platform, 
    private citationService: CitationService, 
    private actionSheetCtrl: ActionSheetController, 
    private events: Events
  ) { }

  // @HostListener('document:ionBackButton', ['$event'])
  // private overrideHardwareBackAction($event: any) {
  //   $event.detail.register(100, async () => {
  //     // Do what you want
  //     console.log(555);
  //   });
  // }


  async navPop(event?: any) {
    this.navCtrl.back();
  }

  async done() {
    const citation = await this.citationService.getCurrentCitation();
    let location = citation.location;

    if (location) {
      location.street = this.myAddress;
      
      if (location.source === 'maps' && location.latitude === this.myLocation.latLng.lat && location.longitude === this.myLocation.latLng.lng) {
        // other stuff

        await location.save();
        await citation.save();

        this.events.publish(appEvents.EVENT_MAP_SELECTED);

      } else {
        location.latitude = this.myLocation.latLng.lat;
        location.longitude = this.myLocation.latLng.lng;
        location.source = 'maps';

        await location.save();
        await citation.save();

        this.events.publish(appEvents.EVENT_MAP_SELECTED);
      }
    }

    await this.navPop();
  }

  async ngOnInit() {
    if (this.platform.is('cordova')) {
      await this.loadMap();

      this.myLocation = await LocationService.getMyLocation();

      if (this.myLocation) {
        const latLng = this.myLocation.latLng;

        this.map.animateCamera({
          target: latLng,
          zoom: 17,
          tilt: 30
        });

        const addresses = await this.getAddresses(this.myLocation.latLng) as GeocoderResult[];

        if (addresses.length) {
          this.showAddressSheet(addresses.map(a => a.extra.lines[0]), latLng, async address => {
            this.myAddress = address;

            const marker: Marker = await this.map.addMarkerSync({
              title: `${address}`,
              snippet: `(${latLng.lat}, ${latLng.lng})`,
              position: this.myLocation.latLng,
              animation: GoogleMapsAnimation.BOUNCE
            });

            marker.showInfoWindow();
          });
        }
      }
    } else {
      throw 'cordova_not_avaiable';
    }
  }

  async loadMap() {
    const mapOptions: GoogleMapOptions = {};
    mapOptions.camera = {
      zoom: 18,
      tilt: 30
    };

    this.map = GoogleMaps.create('map_canvas');    
  }

  async getAddresses(latLng: LatLng) {
    return Geocoder.geocode({position: latLng});
  }

  async getPositions(address: string) {
    return Geocoder.geocode({address: address});
  }

  async showAddressSheet(addresses: string[], latLng: LatLng, handler: any) {
    const buttons: ActionSheetButton[] = addresses.map(address => {
      return {
        text: address,
        icon: 'man',
        handler: () => {
          handler(address);
        }
      }
    });

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Please select your current place.',
      subHeader: `(${latLng.lat}, ${latLng.lng})`,
      buttons: buttons,
      mode: 'ios',
      cssClass: 'maps-action-sheet',
    });

    actionSheet.present();
  }

}
