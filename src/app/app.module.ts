import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler as BaseErrorHandler, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from './services/services.module';
import { HttpInterceptor } from './shared/http-interceptor';
import { ErrorHandler } from './shared/error-handler';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';
import { AppInjector } from './app.injector';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    ServicesModule,
    ComponentsModule,
    PipesModule

  ],
  providers: [
    BarcodeScanner,
    Camera,
    File,
    FileTransfer,
    GoogleMaps,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: BaseErrorHandler,   useClass: ErrorHandler },
    { provide: HTTP_INTERCEPTORS,  useClass: HttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {

  constructor(injector: Injector) {
    AppInjector.injector = injector;
  }
  
}
