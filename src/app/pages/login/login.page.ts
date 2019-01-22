import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { AuthService, AuthCredential } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.compose([Validators.required])],
      passWord: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
      custKey:  ['', Validators.compose([Validators.required])]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const credential = this.loginForm.getRawValue() as AuthCredential;
      // this.authService.signInWithCredential(credential).subscribe(res => {
        // console.log(res);
        this.navCtrl.navigateForward('/citations');
      // });
    }
  }
}
