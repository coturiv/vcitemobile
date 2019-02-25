import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Citation } from 'src/app/entities';
import { ViolationListModal } from '../violation-list/violation-list.modal';
import { MapsModal } from '../maps/maps.modal';

@Component({
  selector: 'tab-violation',
  templateUrl: './tab-violation.component.html',
  styleUrls: ['./tab-violation.component.scss']
})
export class TabViolationComponent implements OnInit, OnDestroy {
  @Input()
  citation: Citation;

  constructor(private modalCtrl: ModalController) { }

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
    const modal = await this.modalCtrl.create({
      component: MapsModal
    });

    modal.present();
  }
  
  async ngOnDestroy() {
    await this.citation.save();
  }

}
