import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttachmentModal } from './attachment.modal';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  declarations: [AttachmentModal],
  entryComponents: [
    AttachmentModal
  ]
})
export class AttatchmentModalModule {}
