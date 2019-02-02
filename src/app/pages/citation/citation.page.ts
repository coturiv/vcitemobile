import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Citation, VehState } from 'src/app/entity';
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
    private citationService: CitationService,
  ) { }

  async ngOnInit() {
    const cid = this.route.snapshot.params['cid'];
    //remove me
    this.citation.id = cid;

    // this.citation = await this.citationService.getCitation(cid);
    this.citation = new Citation();
    this.citation.attachments = this.citation.attachments || [];
    // this.citation = await Citation.findOne({id: cid});

    //remove me
    // this.citation.state = (await VehState.findOne()).name;
  }

  segmentChanged(ev: any) {
    this.curSegment = ev.target.value;
  }

  async onSubmit() {
    console.log(this.citation);
    await this.citationService.submitCitation(this.citation);

    // TODO:show success message
  }

  async takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    const imageData = 'http://www.thinkstockphotos.com/ts-resources/images/home/TS_AnonHP_462882495_01.jpg';
    // const imageData = await this.camera.getPicture(options);
    // console.log(imageData);
    // if (imageData) {
    //   this.citation.attachments.push()
    // }

    const modal = await this.modalCtrl.create({
      component: AttachmentModal,
      componentProps: {
        attachment: imageData
      }
    });
    modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.citation.attachments.push(data);
    }
  }

}
