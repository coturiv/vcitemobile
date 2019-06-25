import { Component } from '@angular/core';
import { AbstractComponent } from '../abstract.component';
import { ModalController, NavController } from '@ionic/angular';
import { CitationService } from 'src/app/services/citation.service';
import { ViolationListModal } from '../violation-list/violation-list.modal';
import { LocationListModal } from '../location-list/location-list.modal';
import { DefaultValues, StorageKeys } from 'src/app/utility/constant';

@Component({
  selector: 'tab-violation',
  templateUrl: './tab-violation.component.html',
  styleUrls: ['./tab-violation.component.scss']
})
export class TabViolationComponent extends AbstractComponent {
  MAX_COMMENTS_LENGTH = DefaultValues.CITATION_MAX_COMMENT;

  // TMP
  enabledFields: any = {};

  constructor(private modalCtrl: ModalController, private navCtrl: NavController, private citationService: CitationService) {
    super();
  }

  async ngOnInit() {
    this.enabledFields.addressLookup = localStorage.getItem(StorageKeys.TOGGLE_ADDRESS_LOOKUP) === 'true';
    this.enabledFields.parcelID = localStorage.getItem(StorageKeys.TOGGLE_PARCEL_ID) === 'true';
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

  async openLocationPicker() {
    const modal = await this.modalCtrl.create({
      component: LocationListModal,
      componentProps: {
        selected: this.citation.location.Street ? this.citation.location : null
      }
    });

    modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      data.address = `${data.StreetNumber}, ${data.Street + (data.Unit ? ', ' + data.Unit : '')}`;
      this.citation.location = data;
    }

  }

  async openMaps() {
    this.navCtrl.navigateForward('/maps');
  }

}
