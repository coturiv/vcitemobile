import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Citation, Violation } from 'src/app/entities';
import { getRepository } from 'typeorm';

@Component({
  selector: 'app-violation',
  templateUrl: './violation.modal.html',
  styleUrls: ['./violation.modal.scss'],
})
export class ViolationModal implements OnInit {
  citation: Citation;
  violations: Violation[];

  constructor(private modalCtrl: ModalController) { }

  async ngOnInit() {
    this.violations = await getRepository('violation').find() as Violation[];
    this.violations.map(v => {
      (v as any).checked = this.citation.violations.filter(cv => cv.violation_id === v.violation_id).length > 0;
      return v;
    });
  }

  async onSave() {
    this.citation.violations = this.violations.filter((v: any) => v.checked);
    await this.close();
  }

  async close() {
    this.modalCtrl.dismiss();
  }

}
