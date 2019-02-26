import { Component } from '@angular/core';
import { CitationTab } from '../citation.tab';
import { CommonService } from 'src/app/services/common.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Attachment } from 'src/app/entities';

@Component({
  selector: 'app-tab-photos',
  templateUrl: './tab-photos.page.html',
  styleUrls: ['./tab-photos.page.scss'],
})
export class TabPhotosPage extends CitationTab {
  textEmptyAttachs: string = 'For best results, rotate your phone to a landscape position is if it were a regular camera.';

  images = ['https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg'];

  constructor(private camera: Camera) {
    super();
  }

  ngOnInit() {
    this.images.unshift('');
  }


  async takePhoto() {
    this.commonService.showPrompt('Suggest name?', async fileName => {

      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      const imageData = await this.camera.getPicture(options);
      if (imageData) {
        const attachment = new Attachment();

        attachment.citation = this.citation;
        attachment.name = fileName;
        attachment.data = imageData;

        this.citation.attachments.push(attachment);
      }
    });
  }
}
