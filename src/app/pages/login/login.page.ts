import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, ToastController, LoadingController, Events, Platform, MenuController } from '@ionic/angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';
// import { ConfigService } from 'src/app/services/config.service';

import { Device } from '@ionic-native/device/ngx';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StorageKeys } from 'src/app/utility/constant';
import { NotifyService } from 'ionic4-kits';
import { ApiResponse } from 'src/app/services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [ Device ]
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm: FormGroup;
  uuid: string;

  isSynchronized = false;

  authSubject: Subject<any>;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private events: Events,
    private authService: AuthService,
    private notifyService: NotifyService,
    // private configService: ConfigService,
    private platform: Platform,
    private device: Device,
    private menuCtrl: MenuController
  ) {
    this.authSubject = new Subject();
  }

  get dnsControl() {
    return this.loginForm.controls['DNSName'];
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  async ngOnInit() {
    const DNSName = 'lynnma.vciteplus.com';

    this.loginForm = this.formBuilder.group({
      UserID  : ['', Validators.compose([Validators.required])],
      Password: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
      DNSName : [DNSName ? {value: DNSName, disabled: true} : '', Validators.compose([Validators.required])]
    });

    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.uuid = this.device.uuid.replace(/-/g, '').substr(-16).toUpperCase();
      }
    });

  }

  async onLogin() {
    if (this.loginForm.valid) {

      const {UserID, Password, DNSName} = this.loginForm.getRawValue();
      localStorage.setItem(StorageKeys.CURRENT_DNS_NAME, DNSName);

      const loading = await this.loadingCtrl.create({
        message: 'authenticating...'
      });
      loading.present();

      this.authService.signInWithCredential(UserID, Password)
        .pipe(takeUntil(this.authSubject))
        .subscribe((resp: ApiResponse<any>) => {
          loading.dismiss();

          if (resp.status.success) {
            localStorage.setItem(StorageKeys.CURRENT_USER, JSON.stringify(resp.data));

            // this.notifyService.showNotify('Logged in successfully', 'success');

            this.navCtrl.navigateForward('/citations');
          } else {
            this.notifyService.showNotify(resp.status.message, 'error');
          }

      }, (error) => {

        loading.dismiss();
        this.notifyService.showNotify('Login credential is not correct, please try again.', 'error');
      });
    }
  }

  ngOnDestroy() {
    this.authSubject.next();
    this.authSubject.complete();
  }
}
