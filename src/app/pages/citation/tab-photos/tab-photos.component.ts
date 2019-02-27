import { Component } from '@angular/core';
import { AbstractComponent } from '../abstract.component';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CommonService } from 'src/app/services/common.service';
import { Attachment } from 'src/app/entities';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'tab-photos',
  templateUrl: './tab-photos.component.html',
  styleUrls: ['./tab-photos.component.scss']
})
export class TabPhotosComponent extends AbstractComponent {

  noContentText: string = 'For best results, rotate your phone to a landscape position is if it were a regular camera.';
  photos: Attachment[] = [null];

  constructor(private camera: Camera, private commonService: CommonService, private photoViewer: PhotoViewer) {
    super();
  }

  async ngOnInit() {

    this.citation.attachments.forEach(a => {
      this.photos.push(a);
    });

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
        this.photos.push(attachment);
      }
    });
  }

  viewPhoto(photo: Attachment) {
    // this.photoViewer.show('data:image/jpeg;base64,' + photo.data, `${photo.name}.${photo.type}`, {share: false});
  }

}
