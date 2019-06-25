import { Component } from '@angular/core';
import { AbstractComponent } from '../abstract.component';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Attachment } from 'src/app/entities';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AlertInput } from '@ionic/core';
import { NotifyService } from 'ionic4-kits';


@Component({
  selector: 'tab-photos',
  templateUrl: './tab-photos.component.html',
  styleUrls: ['./tab-photos.component.scss']
})
export class TabPhotosComponent extends AbstractComponent {

  noContentText = 'For best results, rotate your phone to a landscape position is if it were a regular camera.';
  photos: Attachment[];

  isEditing = false;
  isMultiSelected = false;

  constructor(private camera: Camera, private notifyService: NotifyService, private photoViewer: PhotoViewer) {
    super();
  }

  async ngOnInit() {

    this.loadPhotos();

  }

  private loadPhotos() {
    this.photos = [null];

    this.citation.attachments.forEach(a => {
      this.photos.push(a);
    });
  }

  async takePhoto() {
    // const inputs: AlertInput[] = [{
    //   name: 'fileName',
    //   type: 'text',
    //   placeholder: 'File Name'
    // }];

    // this.notifyService.showPrompt('Suggest name?', inputs, async data => {

      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };

      const imageData = await this.camera.getPicture(options);
      if (imageData) {
        const attachment = new Attachment();

        attachment.citation = this.citation;
        // attachment.Name = data.fileName;
        attachment.Name = `evd-${Date.now()}.jpg`;
        attachment.data = imageData;
        attachment.type = 'jpg';

        this.citation.attachments.push(attachment);
        this.photos.push(attachment);
      }
    // });
  }

  /**
   * Select/deselect photo
   */
  selectPhoto(photo: any) {
    photo.selected = !photo.selected;
    this.isMultiSelected = this.photos.filter((p: any) => p && p.selected).length > 0;
  }

  /**
   * Preview photo
   */
  previewPhoto(photo: Attachment) {
    this.photoViewer.show('data:image/jpeg;base64,' + photo.data, '', {
      share: false,
      closeButton: true,
      copyToReference: true,
      headers: '',
      piccasoOptions: {}
    });
  }

  /**
   * Remove photo
   */
  removePhoto(photo: Attachment) {
    console.log(this.citation.attachments);
    this.notifyService.showConfirm('Are you sure you want to delete this evidence?', 'Confirm', () => {
      const idx = this.citation.attachments.findIndex(attach => attach.id === photo.id);
      this.citation.attachments.splice(idx, 1);

      this.loadPhotos();
    });
  }

  /**
   * remove multiple photos
   */
  removeSelected() {
    const selectedPhotos = this.photos.filter((p: any) => p && p.selected);

    this.notifyService.showConfirm('Are you sure you want to delete this evidence(s)?', 'Confirm', () => {
      selectedPhotos.forEach(p => {
        const idx = this.citation.attachments.findIndex(attach => attach.id === p.id);
        this.citation.attachments.splice(idx, 1);
      });

      this.loadPhotos();
      this.isMultiSelected = false;
    });
  }

}
