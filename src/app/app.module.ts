import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { VehicleInformationPage } from '../pages/vehicle-information/vehicle-information';
import { ViolationDetailsPage } from '../pages/violation-details/violation-details';
import { PhotoEvidencePage } from '../pages/photo-evidence/photo-evidence';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { ReviewFinishPage } from '../pages/review-finish/review-finish';
import { VelosumLoginPage } from '../pages/velosum-login/velosum-login';
import { AboutVCiteMobilePage } from '../pages/about-vcite-mobile/about-vcite-mobile';
import { SettingsPage } from '../pages/settings/settings';
import { ReferencePage } from '../pages/reference/reference';
import { QrscanPage } from '../pages/qrscan/qrscan';
import { CitationsPage } from '../pages/citations/citations';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Camera } from '@ionic-native/camera';
import { AppVersion } from '@ionic-native/app-version';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    VehicleInformationPage,
    ViolationDetailsPage,
    PhotoEvidencePage,
    TabsControllerPage,
    ReviewFinishPage,
    VelosumLoginPage,
    AboutVCiteMobilePage,
    SettingsPage,
    ReferencePage,
    QrscanPage,
    CitationsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VehicleInformationPage,
    ViolationDetailsPage,
    PhotoEvidencePage,
    TabsControllerPage,
    ReviewFinishPage,
    VelosumLoginPage,
    AboutVCiteMobilePage,
    SettingsPage,
    ReferencePage,
    QrscanPage,
    CitationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Camera,
    SQLite,
    Toast,
    AppVersion,
    DataServiceProvider
  ]
})
export class AppModule {}