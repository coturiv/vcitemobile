import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SettingsService } from 'src/app/services/settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { CitationService } from 'src/app/services/citation.service';
import { Citation, VehState } from 'src/app/entities';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  settingsForm: FormGroup;

  curSegment: 'general' | 'database' = 'general';
  citation: Citation;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private platform: Platform,
    private settingsService: SettingsService,
    private authService: AuthService,
    private citationService: CitationService
  ) { }

  async ngOnInit() {
    const settings: any = this.settingsService.getSettings() || {};
    
    const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    if (loginInfo) {
      // settings.userID  = loginInfo.userID;
      settings.custKey = loginInfo.custKey;
    }
    
    this.settingsForm = this.formBuilder.group({
      custKey: [settings.custKey, Validators.compose([Validators.required])],
      userID : [settings.userID,  Validators.compose([Validators.required])],
      // hostURL: [settings.hostURL, Validators.compose([Validators.required])]
      hostURL: [{value: 'http://216.83.136.35/Velosum/', disabled: false}, Validators.compose([Validators.required])]
    });
    this.citation = await this.citationService.getDefaultCitation();
    console.log(this.citation);
  }
  
  segmentChanged(ev: any) {
    this.curSegment = ev.target.value;
  }

  async onSave() {
    const settings = this.settingsForm.getRawValue();
    await this.settingsService.setSettings(settings);

    await this.showMessage('Settings have been submitted successfully!');


    if (this.authService.loginInfo) {

      this.navCtrl.navigateForward('/citations');
    } else {
      
      this.navCtrl.navigateForward('/login');
    }
  }

  private async showMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: 'secondary',
      duration: 1500
    });
    toast.present();
  }

}
