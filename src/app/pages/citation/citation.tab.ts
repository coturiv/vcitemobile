import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Citation } from 'src/app/entities';
import { AppInjector } from 'src/app/app.injector';
import { CommonService } from 'src/app/services/common.service';
import { CitationService } from 'src/app/services/citation.service';

@Component({
	selector: 'app-citation-tab',
	template: ''
})
export class CitationTab implements OnInit {
	citation: Citation;
	
	loadingCtrl: LoadingController;
	commonService: CommonService;
	citationService: CitationService;


	constructor() {
		const injector = AppInjector.injector;
		
		this.loadingCtrl = injector.get(LoadingController);
		this.commonService = injector.get(CommonService);
		this.citationService = injector.get(CitationService);
	}

	ngOnInit() {
	}

	async ionViewWillEnter() {
		// const loading = await this.loadingCtrl.create();
		// loading.present();

		this.citation = await this.citationService.getCurrentCitation();

		// loading.dismiss();
  }

  async ionViewWillLeave() {
    await this.citation.save();
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
}
