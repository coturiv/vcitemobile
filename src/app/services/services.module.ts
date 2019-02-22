import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from './api.service';
import { AssetsService } from './assets.service';
import { AuthService } from './auth.service';
import { SettingsService } from './settings.service';
import { DbService } from './db.service';
import { CommonService } from './common.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService,
    CommonService,
    AssetsService,
    AuthService,
    SettingsService,

    DbService
  ]
})
export class ServicesModule { }
