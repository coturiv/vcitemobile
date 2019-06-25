import { Component } from '@angular/core';

import { AppVersion } from '@ionic-native/app-version/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  providers: [
    AppVersion
  ]
})
export class AboutPage {
  version: string | number      = '0.0.1';
  versionCode: string | number  = '1';
  today: Date = new Date();
  company     = 'PenFormsUSA Inc.';

  rate: number;

  constructor(appVersion: AppVersion, platform: Platform) {

    platform.ready().then(async () => {
      this.version = await appVersion.getVersionNumber();
      this.versionCode = await appVersion.getVersionCode();
    });

  }
}
