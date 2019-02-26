import { Component } from '@angular/core';
import { ModalController, NavController, Events } from '@ionic/angular';

import { CitationTab } from '../citation.tab';
import { ViolationListModal } from './violation-list/violation-list.modal';
import { appEvents } from 'src/app/utility/constant';

@Component({
  selector: 'app-tab-violation',
  templateUrl: './tab-violation.page.html',
  styleUrls: ['./tab-violation.page.scss'],
})
export class TabViolationPage extends CitationTab {

  constructor(private modalCtrl: ModalController, private navCtrl: NavController, private events: Events) {
    super();
  }

  ngOnInit() {
    this.events.subscribe(appEvents.EVENT_MAP_SELECTED, async () => {
      this.citation = await this.citationService.getCurrentCitation();
    });
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

  async ionViewWillLeave() {
    this.events.unsubscribe(appEvents.EVENT_MAP_SELECTED);
    
    await super.ionViewWillLeave();
  }

}
