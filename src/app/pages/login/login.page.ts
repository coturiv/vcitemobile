import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, Events } from '@ionic/angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { AuthService, AuthCredential } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private events: Events,
    private authService: AuthService,
    private settingsService: SettingsService
  ) {
  }

  ngOnInit() {
    const {userID, custKey} = this.settingsService.getSettings();

    this.loginForm = this.formBuilder.group({
      userName: [userID, Validators.compose([Validators.required])],
      passWord: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
      custKey: [custKey, Validators.compose([Validators.required])]
    });

  }

  async onLogin() {
    if (this.loginForm.valid) {
      const loading = await this.loadingCtrl.create();
      loading.present();

      const credential = this.loginForm.getRawValue() as AuthCredential;
      this.authService.signInWithCredential(credential).subscribe(res => {

        // this.showMessage('Logged in successfully', 'secondary');
        // this.authService.loginInfo = credential;

        // this.navCtrl.navigateForward('/citations');
        loading.dismiss();

      }, (error) => {

        loading.dismiss();

        console.log(error);

        const strError = JSON.stringify(error);

        // TODO: remove me when CORS issue is resolved in the rest api.
        const strCredentials = JSON.stringify(credential);
        if (strError.includes('LOGIN SUCCESS') || (strCredentials.includes('LynnTest') && strCredentials.includes('39') && strCredentials.includes('1234'))) {

          this.showMessage('Logged in successfully', 'secondary');
          this.authService.loginInfo = credential;
          this.events.publish('loggedIn');

          this.navCtrl.navigateForward('/citations');
        // } else if (strError.includes('ERROR:no match')) {
        } else {

          this.showMessage('Login credential is not correct, please try again.', 'danger');

        // } else {

        //   this.showMessage('Unknown error', 'danger');

        }
      });
    }
  }

  private async showMessage(message: string, type: 'secondary' | 'danger') {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: type == 'danger',
      color: type,
      duration: 1500
    });

    toast.present();
  }
}
