import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SettingsService } from 'src/app/services/settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { CitationService } from 'src/app/services/citation.service';
import { Citation, VehState } from 'src/app/entities';
import { CommonService } from 'src/app/services/common.service';

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
    private platform: Platform,
    private settingsService: SettingsService,
    private authService: AuthService,
    private citationService: CitationService,
    private commonService: CommonService
  ) { }

  async ngOnInit() {
    const settings: any = this.settingsService.getSettings() || {};
    
    const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    console.log(loginInfo);
    if (loginInfo) {
      // settings.userID  = loginInfo.userID;
      settings.custKey = loginInfo.custKey;
      settings.userID  = loginInfo.userName;
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

    await this.commonService.showNotify('Settings have been submitted successfully!');

    if (this.authService.loginInfo) {

      this.navCtrl.navigateForward('/citations');
    } else {
      
      this.navCtrl.navigateForward('/login');
    }
  }

  changePassword() {
    this.navCtrl.navigateForward('/change-password');
  }

  logout() {
    this.authService.loginInfo = null;
    this.navCtrl.navigateRoot('/login');
  }

}
