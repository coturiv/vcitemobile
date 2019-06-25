import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Citation } from 'src/app/entities';
import { CitationService } from 'src/app/services/citation.service';
import { DbService } from 'src/app/services/db.service';
import { StorageKeys, AppEvents } from 'src/app/utility/constant';
import { Events, LoadingController, NavController } from '@ionic/angular';
import { throwAppError } from 'src/app/shared/error-handler';
import { NotifyService } from 'ionic4-kits';

@Component({
  selector: 'app-citation',
  templateUrl: './citation.page.html',
  styleUrls: ['./citation.page.scss'],
})
export class CitationPage implements OnInit, OnDestroy {

  segment: 'vehicle' | 'violation' | 'photos' | 'review';

  citation: Citation;

  private get curSegment() {
    return localStorage.getItem(StorageKeys.CURRENT_CITATION_VIEW);
  }

  private set curSegment(segment) {
    localStorage.setItem(StorageKeys.CURRENT_CITATION_VIEW, segment);
  }

  constructor(
    private route: ActivatedRoute,
    private citationService: CitationService,
    private navCtrl: NavController,
    private events: Events,
    private loadingCtrl: LoadingController,
    private notifyService: NotifyService,

  ) { }

  async ngOnInit() {

    this.segment = this.curSegment as any || 'vehicle';

    const { cId } = this.route.snapshot.params;

    this.citationService.currentId = cId;

    const loading = await this.loadingCtrl.create();
    loading.present();

    try {
      this.citation = await this.citationService.getCitation(Number(cId));
      loading.dismiss();
    } catch (e) {
      loading.dismiss();

      console.log(e);

      throwAppError('DB_ENTITY_READ_FAILED');
    }

    this.events.subscribe(AppEvents.EVENT_MAP_SELECTED, async () => {
      this.citation = await this.citationService.getCurrentCitation();
    });
  }

  async onSubmit() {

    try {
      await this.citation.save();
    } catch (e) {
      console.log(e);

      throwAppError('DB_ENTITY_UPDATE_FAILED');
    }

    this.notifyService.showConfirm(
      'All changes have been saved to your device storage. Do you want to upload now?',
      'Confirm',
      async () => {
        const loading = await this.loadingCtrl.create();
        loading.present();

        try {
          const success = await this.citationService.submitCitation(this.citation);
          loading.dismiss();

          if (success) {

            try {
              this.citation.is_submitted = true;
              await this.citation.save();
            } catch (e) {
              console.log(e);

              throwAppError('DB_ENTITY_UPDATE_FAILED');
            }

            this.notifyService.showAlert(success.response, 'Success');

            this.navCtrl.navigateRoot('/citations');
          }
        } catch (e) {
          loading.dismiss();

          console.log('Submit fails!', e);

          this.notifyService.showAlert(JSON.stringify(e), 'Error');
        }
    });
  }

  segmentChanged(ev: any) {
    this.segment = ev.target.value;

    this.curSegment = this.segment;
  }

  ngOnDestroy() {
    this.events.unsubscribe(AppEvents.EVENT_MAP_SELECTED);
  }

}
