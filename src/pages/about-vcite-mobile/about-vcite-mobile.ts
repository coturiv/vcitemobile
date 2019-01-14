import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

@Component({
  selector: 'page-about-vcite-mobile',
  templateUrl: 'about-vcite-mobile.html'
})
export class AboutVCiteMobilePage {

  //AppName: any = this.appVersion.getAppName();
  //PackageName: any = this.appVersion.getPackageName();
  //VersionCode: any = this.appVersion.getVersionCode();
  versionNumber: any;
  
  constructor(public navCtrl: NavController, private appVersion: AppVersion) {
    appVersion.getVersionNumber().then(ver => {
      this.versionNumber = ver;
    }).catch(function(error) {
      console.log(error);
    })
  }

  
}
