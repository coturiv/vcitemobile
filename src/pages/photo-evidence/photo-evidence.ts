import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-photo-evidence',
  templateUrl: 'photo-evidence.html'
})
export class PhotoEvidencePage {

  public photos : any;
  public base64Image : string;
  citationSN: any;
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataServiceProvider,
    private sqlite: SQLite,
    private camera: Camera,
    private alertCtrl: AlertController) {
      console.log("navParams-sn: " + this.navParams.get('sn'));
      console.log("navParams-cid: " + this.navParams.get('cid'));
      this.citationSN = this.navParams.get('sn');
  }

  ngOnInit() {
    this.photos = [];
  }

  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
        title: 'Are you sure you want to delete this photo?',
        message: '',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Cancel clicked');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Confirm clicked');
              this.photos.splice(index, 1);
            }
          }
        ]
      });
    confirm.present();
  }
  takePhoto() {
    const options : CameraOptions = {
      quality: 25, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options) .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
      }, (err) => {
        console.log(err);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoEvidencePage');
    console.log(this.navParams.data);
  }
}
