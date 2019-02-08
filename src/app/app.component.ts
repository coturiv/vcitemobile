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
      title: 'About',
      url: '/about',
      icon: 'information-circle'
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

    this.dbService.initialize();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    
    const appConfig = this.settingsService.getSettings();
    
    if (!appConfig) {
      this.navCtrl.navigateForward('/settings');
    }
    
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
