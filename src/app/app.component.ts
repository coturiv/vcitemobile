import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SettingsService } from './services/settings.service';
import { DbService } from './services/db.service';

import 'reflect-metadata';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Citations',
      url: '/citations',
      icon: 'home'
    }, {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    }, {
      title: 'Reference',
      url: '/reference',
      icon: 'book'
    }, {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    }, {
      title: 'About',
      url: '/about',
      icon: 'information-circle'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,

    private settingsService: SettingsService,
    private dbService: DbService
  ) {
    this.initializeApp();

    this.dbService.initialize();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    const appConfig = await this.settingsService.getSettings();
    if (!appConfig) {
      this.navCtrl.navigateForward('/settings');
    }
  }

  navigateTo(url: string) {
    this.navCtrl.navigateForward(url);
  }
}
