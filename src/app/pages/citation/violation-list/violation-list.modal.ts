import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Citation, Violation } from 'src/app/entities';
import { getRepository } from 'typeorm';
import { DefaultValues } from 'src/app/utility/constant';
import { NotifyService } from 'ionic4-kits';

@Component({
  selector: 'app-violation-list',
  templateUrl: './violation-list.modal.html',
  styleUrls: ['./violation-list.modal.scss'],
})
export class ViolationListModal implements OnInit {
  citation: Citation;
  violations: Violation[];

  readonly VIOLATIONS_MAX = DefaultValues.CITATION_MAX_VIOLATIONS;

  constructor(private modalCtrl: ModalController, private notifyService: NotifyService) { }

  async ngOnInit() {
    this.violations = await getRepository('violation').find() as Violation[];
    this.violations.map(v => {
      (v as any).checked = this.citation.violations.filter(cv => cv.violation_id === v.violation_id).length > 0;
      return v;
    });
  }

  validChecklist(ev: any) {
    if (this.violations.filter((v: any) => v.checked).length > this.VIOLATIONS_MAX) {
      this.notifyService.showNotify(`Limitted to a maximum of ${this.VIOLATIONS_MAX} violations.`, 'warning', false, 3000);

      ev.target.checked = false;
    }
  }

  async onSave() {
    this.citation.violations = this.violations.filter((v: any) => v.checked);
    await this.close();
  }

  async close() {
    this.modalCtrl.dismiss();
  }

}
