import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Citation } from 'src/app/entity';
import { CitationService } from 'src/app/services/citation.service';
import { AttachmentModal } from './attatchment/attachment.modal';

@Component({
  selector: 'app-citation',
  templateUrl: './citation.page.html',
  styleUrls: ['./citation.page.scss'],
})
export class CitationPage implements OnInit {

  curSegment: 'vehicle' | 'violation' | 'photos' | 'review' = 'vehicle';

  citation: Citation = new Citation();

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
    const loading = await this.loadingCtrl.create();
    loading.present();

    this.citationService.submitCitation(this.citation).then(success => {
      loading.dismiss();

      if (success) {
        this.showMessage(success.response);
      }
    }, error => {
      loading.dismiss();
    });
  }

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
          citationId: this.citation.id
        }
      });
      modal.present();
  
      const { data } = await modal.onDidDismiss();
      if (data) {
        this.citation.attachments.push(data);
      }
    }
  }

  private async showMessage(message: string) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
