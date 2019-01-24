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
    let settings: any = {};
    this.settingsForm = this.formBuilder.group({
      option1: [settings.option1, Validators.compose([Validators.required])],
      option2: [settings.option2, Validators.compose([Validators.required])],
      option3: [settings.option3, Validators.compose([Validators.required])],
      option4: [settings.option4, Validators.compose([Validators.required])],
      option5: [settings.option5, Validators.compose([Validators.required])],
      option6: [settings.option6, Validators.compose([Validators.required])]
    });

    settings = this.settingsService.getSettings() || {};
    
  }

  async onSave() {
    const settings = this.settingsForm.getRawValue();
    await this.settingsService.setSettings(settings);

    this.navCtrl.navigateForward('/citations');
  }

}
