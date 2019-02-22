import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Citation } from 'src/app/entities';
import { CitationService } from 'src/app/services/citation.service';
import { AttachmentModal } from './attatchment/attachment.modal';
import { ViolationModal } from './violation/violation.modal';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-citation',
  templateUrl: './citation.page.html',
  styleUrls: ['./citation.page.scss'],
})
export class CitationPage implements OnInit, OnDestroy {

  curSegment: 'vehicle' | 'violation' | 'photos' | 'review' = 'review';

  citation: Citation = new Citation();
  textEmptyAttachs: string = 'For best results, rotate your phone to a landscape position is if it were a regular camera.';

  constructor(
    private route: ActivatedRoute,
    private camera: Camera,
    private modalCtrl: ModalController,
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

  inputToUppercase(event: any) {
    event.target.value = (event.target.value as string).toUpperCase();
  }

  /**
   * create/edit violation(s)
   */
  async editViolations() {
    const modal = await this.modalCtrl.create({
      component: ViolationModal,
      componentProps: {
        citation: this.citation
      }
    });
    modal.present();
  }

  /**
   * take a picture(attachment)
   */
  async takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    const imageData = await this.camera.getPicture(options);
    if (imageData) {
      const modal = await this.modalCtrl.create({
        component: AttachmentModal,
        componentProps: {
          attachment: imageData,
          citation: this.citation
        }
      });
      modal.present();
  
      const { data } = await modal.onDidDismiss();
      if (data) {
        this.citation.attachments.push(data);
      }
    }
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
