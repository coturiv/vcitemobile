import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  settingsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    const settings: any = this.settingsService.getSettings() || {};

    const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    if (loginInfo) {
      // settings.userID  = loginInfo.userID;
      settings.custKey = loginInfo.custKey;
    }

    this.settingsForm = this.formBuilder.group({
      custKey: [settings.custKey, Validators.compose([Validators.required])],
      userID : [settings.userID,  Validators.compose([Validators.required])],
      hostURL: [settings.hostURL, Validators.compose([Validators.required])]
    });
  }

  async onSave() {
    const settings = this.settingsForm.getRawValue();
    await this.settingsService.setSettings(settings);

    this.navCtrl.navigateForward('/citations');
  }

}
