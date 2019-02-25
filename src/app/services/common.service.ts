import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  private isToastDisplayed: boolean = false;

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  /**
   * Show Alert Dialog
   * 
   * @param message 
   * @param title 
   */
  async showAlert(message: string, title: string) {
    const alert = await this.alertCtrl.create({
      message: message,
      header: title,
      buttons: ['Ok']
    });

    await alert.present();
  }

  /**
   * Show Confirm Dialog
   * 
   * @param message 
   * @param title 
   * @param confirm 
   * @param cancel 
   */
  async showConfirm(message: string, title: string, confirm: any, cancel: any = () => {}) {
    const alert = await this.alertCtrl.create({
      message: message,
      header: title,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: cancel
      }, {
        text: 'Ok',
        handler: confirm
      }]
    });

    await alert.present();
  }

  /**
   * Show Prompt
   * 
   * @param title 
   * @param confirm 
   * @param cancel 
   */
  async showPrompt(title: string, confirm: any, cancel: any = () => {}) {
    const alert = await this.alertCtrl.create({
      header: title,
      inputs: [{
        name: 'fileName',
        type: 'text',
        placeholder: 'File Name'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: cancel
      }, {
        text: 'Ok',
        handler: data => {
          confirm(data.fileName);
        }
      }]
    });

    alert.present();
  }

  /**
   * show notification(toast)
   * 
   * @param message 
   * @param type 
   * @param showCloseBtn 
   * @param duration 
   * @param position 
   */
  async showNotify(
    message: string, 
    type: 'success' | 'info' | 'warning' | 'error' = 'info', 
    showCloseBtn: boolean = true,
    duration: number = 2500, 
    position: 'bottom' | 'middle' | 'top' = 'bottom'
  ) {

    const colorDic = {
      'success': 'success',
      'info'   : 'secondary',
      'warning': 'warning',
      'error'  : 'danger'
    };

    const toast = await this.toastCtrl.create({
      message: message,
      color: colorDic[type],
      showCloseButton: showCloseBtn,
      duration: showCloseBtn ? null : duration,
      position: position
    });

    toast.onDidDismiss().then(() => {
      this.isToastDisplayed = false;
    });

    if (!this.isToastDisplayed) {
      toast.present();

      this.isToastDisplayed = true;
    }
  }
}
