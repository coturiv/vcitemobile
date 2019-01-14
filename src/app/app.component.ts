import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { VelosumLoginPage } from '../pages/velosum-login/velosum-login';
import { ReferencePage } from '../pages/reference/reference';
import { AboutVCiteMobilePage } from '../pages/about-vcite-mobile/about-vcite-mobile';
import { SettingsPage } from '../pages/settings/settings';
import { QrscanPage } from '../pages/qrscan/qrscan';
import { CitationsPage } from '../pages/citations/citations';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = CitationsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // The platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToVelosumLogin(params){
    if (!params) params = {};
    this.navCtrl.setRoot(VelosumLoginPage);
  }goToReference(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ReferencePage);
  }goToCitations(params){
    if (!params) params = {};
    this.navCtrl.setRoot(CitationsPage);
  }goToQrScan(params){
    if (!params) params = {};
    this.navCtrl.setRoot(QrscanPage);
  }goToAboutVCiteMobile(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AboutVCiteMobilePage);
  }goToSettings(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SettingsPage);
  }
}
