import { Component } from '@angular/core';
import { Platform, NavController, Events } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SettingsService } from './services/settings.service';
import { DbService } from './services/db.service';

import 'reflect-metadata';
import { AuthService } from './services/auth.service';

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
      icon: 'list-box'
    }, {
      title: 'vChalk',
      url: '/reference',
      icon: 'clock'
    }, {
      title: 'Reference',
      url: '/reference',
      icon: 'book'
    }, {
      title: 'About',
      url: '/about',
      icon: 'information-circle'
    }, {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    }
  ];

  isLoggedIn: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private events: Events,

    private settingsService: SettingsService,
    private authService: AuthService,
    private dbService: DbService
  ) {
    this.initializeApp();

  }
  
  async initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      await this.dbService.ready();
    });
    
    this.isLoggedIn = !!this.authService.loginInfo;

    // TODO: topic to Constants
    this.events.subscribe('loggedIn', () => {
      this.isLoggedIn = !!this.authService.loginInfo;
    });

  }

  navigateTo(url: string) {
    this.navCtrl.navigateForward(url);
  }

  logout() {
    this.authService.loginInfo = null;
    this.isLoggedIn = false;
    this.navCtrl.navigateRoot('/login');
  }
}
