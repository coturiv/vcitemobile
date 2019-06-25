import { Component } from '@angular/core';
import { AbstractComponent } from '../abstract.component';
import { DefaultValues } from 'src/app/utility/constant';
import { NotifyService } from 'ionic4-kits';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var TesseractPlugin: any;

import Tesseract from 'tesseract.js';

@Component({
  selector: 'tab-vehicle',
  templateUrl: './tab-vehicle.component.html',
  styleUrls: ['./tab-vehicle.component.scss']
})
export class TabVehicleComponent extends AbstractComponent {
  VIN_MAX_LENGTH = DefaultValues.CITATION_MAX_VIN;

  constructor(private notifyService: NotifyService, private camera: Camera) {
    super();
  }

  async ngOnInit() {
    // await this.loadTesseractLang();
  }

  /**
   * auto correct vin code
   *
   * @param event
   */
  validVinInput(event: any) {
    const vinCode: string = event.target.value;
    let newChar: string = vinCode.substr(-1);

    switch (newChar) {
      case 'I':
      case 'i':
        newChar = '1';
        break;

      case 'O':
      case 'o':
      case 'Q':
      case 'q':
        newChar = '0';
        break;

      default:
        break;
    }

    event.target.value = vinCode.substr(0, vinCode.length - 1) + newChar;

    if (this.citation.vehicle_vin && this.citation.vehicle_vin.length === this.VIN_MAX_LENGTH) {

      this.notifyService.showNotify(`VIN cannot exceed ${this.VIN_MAX_LENGTH} characters`, 'warning', false, 3000);
    }

  }

  scanLicensePlate() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera
        .getPicture(options)
        .then(async imageData => {
          try {
            // const text = await this.recognizeText(imageData);
            const text = await Tesseract.recognize(imageData);

            console.log('OCR Text', text);
          } catch (e) {
            console.log(e);
          }
    });
  }

  // // Download OCR Language
  // private loadTesseractLang(language: 'eng' | 'por' = 'eng') {
  //   return new Promise((resolve, reject) => {
  //     TesseractPlugin.loadLanguage(language, resolve, reject);
  //   });
  // }

  // // Recognize Text
  // private recognizeText(imageData: string, language: 'eng' | 'por' = 'eng') {
  //   return new Promise((resolve, reject) => {
  //     TesseractPlugin.recognizeText(imageData, language, resolve, reject);
  //   });
  // }

}
