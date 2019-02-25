import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Citation, Attachment } from 'src/app/entities';
import { CommonService } from 'src/app/services/common.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'tab-photos',
  templateUrl: './tab-photos.component.html',
  styleUrls: ['./tab-photos.component.scss']
})
export class TabPhotosComponent implements OnInit, OnDestroy {

  @Input()
  citation: Citation;

  textEmptyAttachs: string = 'For best results, rotate your phone to a landscape position is if it were a regular camera.';

  images = ['https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg'];

  constructor(private commonService: CommonService, private camera: Camera) { }

  ngOnInit() {
    this.images.unshift('');
  }
  
  async ngOnDestroy() {
    await this.citation.save();
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
