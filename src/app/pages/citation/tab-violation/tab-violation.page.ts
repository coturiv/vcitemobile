import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { CitationTab } from '../citation.tab';
import { ViolationListModal } from './violation-list/violation-list.modal';

@Component({
  selector: 'app-tab-violation',
  templateUrl: './tab-violation.page.html',
  styleUrls: ['./tab-violation.page.scss'],
})
export class TabViolationPage extends CitationTab {

  constructor(private modalCtrl: ModalController, private navCtrl: NavController) {
    super();
  }

  ngOnInit() {
  }

  /**
   * create/edit violation(s)
   */
  async openViolations() {
    const modal = await this.modalCtrl.create({
      component: ViolationListModal,
      componentProps: {
        citation: this.citation
      }
    });

    modal.present();
  }

  async openMaps() {
    this.navCtrl.navigateForward('/maps');
  }

}
