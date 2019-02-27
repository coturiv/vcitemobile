import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Citation } from 'src/app/entities';
import { CitationService } from 'src/app/services/citation.service';
import { DbService } from 'src/app/services/db.service';
import { StorageKeys, AppEvents } from 'src/app/utility/constant';
import { Events, LoadingController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

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
    private dbService: DbService, 
    private events: Events,
    private loadingCtrl: LoadingController,
    private commonService: CommonService,

  ) { }

  async ngOnInit() {
    this.segment = this.curSegment as any || 'vehicle';

    const { cId } = this.route.snapshot.params;

    this.citationService.currentId = cId;
    this.citation = await this.citationService.getCitation(Number(cId));

    this.events.subscribe(AppEvents.EVENT_MAP_SELECTED, async () => {
      this.citation = await this.citationService.getCurrentCitation();
    });
  }

  async onSubmit() {

    try {

      await this.citation.save();

    } catch(e) {

      console.log('Unable to save citation!', e);

    }

    this.commonService.showConfirm('All changes have been saved to your device storage. Do you want to upload now?', 'Confirm', async () => {
      const loading = await this.loadingCtrl.create();
      loading.present();

      try {
        const success = await this.citationService.submitCitation(this.citation);
        loading.dismiss();

        if (success) {
          this.commonService.showAlert(success.response, 'Success');
        }
      } catch (e) {
        loading.dismiss();
        
        console.log('Submit fails!', e);

        this.commonService.showAlert(JSON.stringify(e), 'Error');
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
