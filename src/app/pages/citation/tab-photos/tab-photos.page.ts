import { Component } from '@angular/core';
import { CitationTab } from '../citation.tab';
import { CommonService } from 'src/app/services/common.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Attachment } from 'src/app/entities';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-tab-photos',
  templateUrl: './tab-photos.page.html',
  styleUrls: ['./tab-photos.page.scss'],
})
export class TabPhotosPage extends CitationTab {
  noContentText: string = 'For best results, rotate your phone to a landscape position is if it were a regular camera.';

  constructor(private camera: Camera, private photoViewer: PhotoViewer) {
    super();
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await super.ionViewWillEnter();

    this.citation.attachments.unshift(null);
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
        attachment.type = 'jpg';

        this.citation.attachments.push(attachment);
      }
    });
  }

  viewPhoto(photo: Attachment) {
    // this.photoViewer.show('data:image/jpeg;base64,' + photo.data, `${photo.name}.${photo.type}`, {share: false});
  }

  async ionViewWillLeave() {
    this.citation.attachments.shift();

    await super.ionViewWillLeave();
  }
}
