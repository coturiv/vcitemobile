import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Citation } from 'src/app/entity';
import { CitationService } from 'src/app/services/citation.service';
import { AttachmentModal } from './attatchment/attachment.modal';
import { ViolationModal } from './violation/violation.modal';

@Component({
  selector: 'app-citation',
  templateUrl: './citation.page.html',
  styleUrls: ['./citation.page.scss'],
})
export class CitationPage implements OnInit, OnDestroy {

  curSegment: 'vehicle' | 'violation' | 'photos' | 'review' = 'vehicle';

  citation: Citation = new Citation();
  xmlCitation: string;

  constructor(
    private route: ActivatedRoute,
    private camera: Camera,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private citationService: CitationService,
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

    await this.citation.save();

    const confirm = await this.alertCtrl.create({
      header: 'Confirm',
      message: 'All changes have been saved to the persist storage. Do you want to upload now?',
      buttons: [{
        text: 'No',
        role: 'cancel'
      }, {
        text: 'Yes',
        handler: async () => {
          const loading = await this.loadingCtrl.create();
          loading.present();
          this.citationService.submitCitation(this.citation).then(success => {
            loading.dismiss();
      
            if (success) {
              this.showMessage(success.response);
            }
          }, error => {
            console.log('Submit fails!', error);
            loading.dismiss();
          });
        }
      }]
    });
    await confirm.present();
  }

  /**
   * edit violations
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

  regenerateXmlCitation() {
    this.xmlCitation = this.citationService.getXmlCitation(this.citation);
  }

  private async showMessage(message: string) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    });
    alert.present();
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
