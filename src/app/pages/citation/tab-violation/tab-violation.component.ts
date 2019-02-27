import { Component } from '@angular/core';
import { AbstractComponent } from '../abstract.component';
import { ModalController, NavController } from '@ionic/angular';
import { CitationService } from 'src/app/services/citation.service';
import { ViolationListModal } from '../violation-list/violation-list.modal';

@Component({
  selector: 'tab-violation',
  templateUrl: './tab-violation.component.html',
  styleUrls: ['./tab-violation.component.scss']
})
export class TabViolationComponent extends AbstractComponent {

  constructor(private modalCtrl: ModalController, private navCtrl: NavController, private citationService: CitationService) {
    super();
  }

  async ngOnInit() {
    
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
