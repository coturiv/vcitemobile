import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { AuthService, AuthCredential } from 'src/app/services/auth.service';


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
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.compose([Validators.required])],
      passWord: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
      custKey: ['', Validators.compose([Validators.required])]
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
        if (strError.includes('LOGIN SUCCESS')) {

          this.showMessage('Logged in successfully', 'secondary');
          this.authService.loginInfo = credential;

          this.navCtrl.navigateForward('/citations');
        } else if (strError.includes('ERROR:no match')) {

          this.showMessage('Login credential is not correct, please try again.', 'danger');

        } else {

          this.showMessage('Unknown error', 'danger');

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
