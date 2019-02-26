import { Component } from '@angular/core';
import { Platform, NavController, Events } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
      icon: 'qrcode'
    }, {
      title: 'vChalk',
      url: '/vchalk',
      icon: 'pencil'
    }, {
      title: 'Reference',
      url: '/reference',
      icon: 'books'
    }, {
      title: 'About',
      url: '/about',
      icon: 'info'
    }, {
      title: 'Settings',
      url: '/settings',
      icon: 'cogs'
    }
  ];

  isLoggedIn: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private events: Events,

    private authService: AuthService
  ) {
    this.initializeApp();

  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
