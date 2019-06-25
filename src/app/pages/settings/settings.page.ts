import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifyService } from 'ionic4-kits';

import { SettingsService } from 'src/app/services/settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { CitationService } from 'src/app/services/citation.service';
import { Citation, VehState } from 'src/app/entities';
import { environment } from 'src/environments/environment';
import { StorageKeys } from 'src/app/utility/constant';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  settingsForm: FormGroup;

  curSegment: 'general' | 'database' = 'general';
  citation: Citation;

  // TODO: this is temporary solution, it should be integrated to global settings in future.
  toggledFields: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private platform: Platform,
    private settingsService: SettingsService,
    private authService: AuthService,
    private citationService: CitationService,
    private notifyService: NotifyService
  ) { }

  async ngOnInit() {
    const settings: any = this.settingsService.getSettings() || {};

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);
    if (currentUser) {
      // settings.userID  = currentUser.userID;
      settings.custKey = currentUser.custKey;
      settings.userID  = currentUser.userId;
    }

    this.settingsForm = this.formBuilder.group({
      custKey: [settings.custKey, Validators.compose([Validators.required])],
      userID : [settings.userID,  Validators.compose([Validators.required])],
      // hostURL: [settings.hostURL, Validators.compose([Validators.required])]
      hostURL: [{value: environment.apiUrl, disabled: false}, Validators.compose([Validators.required])]
    });
    this.citation = await this.citationService.getDefaultCitation();
    console.log(this.citation);

    this.toggledFields.addressLookup = localStorage.getItem(StorageKeys.TOGGLE_ADDRESS_LOOKUP) === 'true';
    this.toggledFields.parcelID = localStorage.getItem(StorageKeys.TOGGLE_PARCEL_ID) === 'true';
  }

  segmentChanged(ev: any) {
    this.curSegment = ev.target.value;
  }

  async onSave() {
    const settings = this.settingsForm.getRawValue();
    await this.settingsService.setSettings(settings);

    await this.notifyService.showNotify('Settings have been submitted successfully!');

    if (this.authService.currentUser) {

      this.navCtrl.navigateForward('/citations');
    } else {

      this.navCtrl.navigateForward('/login');
    }
  }

  changePassword() {
    this.navCtrl.navigateForward('/change-password');
  }

  logout() {
    this.authService.currentUser = null;
    this.navCtrl.navigateRoot('/login');
  }

  async restoreCitations() {
    const citations = await this.citationService.getCitations(false);

    citations.forEach(async citation => {
      citation.is_visible = true;
      await citation.save();
    });
  }

  // TMP
  toggleAddressLookup(event: any) {
    console.log(event);
    localStorage.setItem(StorageKeys.TOGGLE_ADDRESS_LOOKUP, String(this.toggledFields.addressLookup));
  }

  // TMP
  toggleParcelID(event: any) {
    console.log(event);
    localStorage.setItem(StorageKeys.TOGGLE_PARCEL_ID, String(this.toggledFields.parcelID));
  }

}
