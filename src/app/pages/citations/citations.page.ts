import { Component, OnInit } from '@angular/core';
import { NavController, Platform, LoadingController } from '@ionic/angular';
import { NotifyService } from 'ionic4-kits';

import { Citation } from 'src/app/entities';
import { CitationService } from 'src/app/services/citation.service';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';
import { throwAppError } from 'src/app/shared/error-handler';

@Component({
  selector: 'app-citations',
  templateUrl: './citations.page.html',
  styleUrls: ['./citations.page.scss'],
})
export class CitationsPage implements OnInit {
  today = new Date();

  citations: Citation[];

  constructor(
    private navCtrl: NavController,
    private citationService: CitationService,
    private dbService: DbService,
    private authService: AuthService,
    private notifyService: NotifyService,
    private platform: Platform,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {

    if (!this.authService.currentUser) {

      this.navCtrl.navigateRoot('login');

    }
  }

  async ionViewDidEnter() {
    if (this.authService.currentUser) {

      await this.platform.ready();

      if (!this.dbService.isSynchronized) {
        await this.dbService.synchronize();
      }

      await this.loadData();
    }

  }

  navigateTo(url: string) {
    this.navCtrl.navigateForward(url);
  }

  async loadData(event?: any) {
    this.citations = await this.citationService.getCitations();
    this.citations = this.citations.map(c => {
      const date = new Date(Number(c.timestamp));
      date.setHours(0, 0, 0, 0);

      (c as any).date = date; // add date attribute for grouping

      c.is_valid = this.isCitationValid(c);

      return c;
    });

    if (event) {
      event.target.complete();
    }
  }

  async clearLog(date: Date) {
    this.notifyService.showConfirm('Are you sure you want to remove this citation from the log?', 'Confirm', async() => {
      const citations = this.citations.filter(c => (c as any).date === date);
      for (const citation of citations) {
        citation.is_visible = false;
        delete (citation as any).date;           // remove temporary attribute

        await citation.save();
      }

      await this.loadData();
    });
  }

  async submit(citation: Citation) {

    const loading = await this.loadingCtrl.create();
    loading.present();

    try {
      const success = await this.citationService.submitCitation(citation);
      loading.dismiss();

      if (success) {
        try {
          citation.is_submitted = true;
          await citation.save();
        } catch (e) {
          console.log(e);

          throwAppError('DB_ENTITY_UPDATE_FAILED');
        }
        this.notifyService.showAlert(success.response, 'Success');
      }
    } catch (e) {
      loading.dismiss();

      console.log('Submit fails!', e);

      this.notifyService.showAlert(JSON.stringify(e), 'Error');
    }
  }

  missingFields(citation: Citation) {
    const requieredFields = ['custKey', 'serial_number', 'vehicle_vin', 'vehicle_license', 'location', 'expiration_date'];
    return requieredFields.filter(field => !citation[field]).join(', ');
  }

  private isCitationValid(citation: Citation): boolean {
    return !this.missingFields(citation);
  }

}
