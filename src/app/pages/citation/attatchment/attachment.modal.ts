import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Attachment } from 'src/app/entity/Attachment';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.modal.html',
  styleUrls: ['./attachment.modal.scss'],
})
export class AttachmentModal implements OnInit {
  attachForm: FormGroup;

  attachment: string;   // base64 image

  constructor(private modalCtrl: ModalController, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.attachForm = this.formBuilder.group({
      name: ['',    Validators.compose([Validators.required])],
      type: [{value: 'jpg', disabled: true}, Validators.compose([Validators.required])]
    });
  }

  onSave() {
    if (this.attachForm.valid) {
      const attachment = new Attachment();
      Object.assign(attachment, this.attachForm.getRawValue());
      attachment.data = this.attachment;

      this.close(attachment);
    }

  }

  async close(attachment?: Attachment) {
    this.modalCtrl.dismiss(attachment);
  }

}
