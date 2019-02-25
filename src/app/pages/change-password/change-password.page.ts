import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      passCurrent: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      passNew    : ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      passConfirm: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    });
  }

  changePassword() {

  }

}
