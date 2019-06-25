import { Component } from '@angular/core';
import { Platform, NavController, Events } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';

import 'reflect-metadata';
import { AuthService } from './services/auth.service';
import { AppEvents } from './utility/constant';
import { DbService } from './services/db.service';

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
      file: 'lynnpark_vcitemobile_vchalk_info.pdf',
      icon: 'pencil'
    }, {
      title: 'Reference',
      url: '/reference',
      file: 'lynnpark_vcitemobile_reference.pdf',
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
    private file: File,
    private fileOpener: FileOpener,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private document: DocumentViewer,
    private navCtrl: NavController,
    private events: Events,
    private dbService: DbService,
    private authService: AuthService
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      await this.dbService.createConnection();
    });

    this.isLoggedIn = !!this.authService.currentUser;

    this.events.subscribe(AppEvents.EVENT_LOGGED_IN, () => {
      this.isLoggedIn = !!this.authService.currentUser;
    });

  }

  navigateTo(url: string) {
    this.navCtrl.navigateForward(url);
  }

  async openLocalPDF(fileName: string, title: string) {
    const fileFormat = 'application/pdf';
    const filePath = this.file.applicationDirectory + 'www/assets/pdfs';

    if (this.platform.is('android')) {
      try {

        await this.file.checkFile(this.file.dataDirectory, fileName);
      } catch (e) {

        await this.file.copyFile(filePath, fileName, this.file.dataDirectory, fileName);
      }
      // if (!isExists) {
      //   await this.file.copyFile(filePath, fileName, this.file.dataDirectory, fileName);
      // }

      this.fileOpener.open(`${this.file.dataDirectory}/${fileName}`, fileFormat);
    } else {
      const options: DocumentViewerOptions = {
        title: title
      };

      this.document.viewDocument(`${filePath}/${fileName}`, fileFormat, options);
    }
  }

  logout() {
    this.authService.currentUser = null;
    this.isLoggedIn = false;
    this.navCtrl.navigateRoot('/login');
  }

  async sync() {
    await this.dbService.synchronize(true);
  }
}
