import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoadingController } from '@ionic/angular';

import { Citation } from 'src/app/entities';
import { CitationService } from 'src/app/services/citation.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-citation',
  templateUrl: './citation.page.html',
  styleUrls: ['./citation.page.scss'],
})
export class CitationPage implements OnInit, OnDestroy {

  curSegment: 'vehicle' | 'violation' | 'photos' | 'review' = 'violation';

  citation: Citation = new Citation();

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private citationService: CitationService,
    private commonService: CommonService
  ) { }

  async ngOnInit() {
    const cid = Number(this.route.snapshot.params['cid']);

    this.citation = await this.citationService.getCitation(cid);
    this.citation.id = this.citation.id || cid;
  }

  segmentChanged(ev: any) {
    this.curSegment = ev.target.value;
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

  /**
   * save current changes to the database
   */  
  private async saveDraft() {
    await this.citation.save();
  }

  ngOnDestroy() {
    this.saveDraft();
  }

}
