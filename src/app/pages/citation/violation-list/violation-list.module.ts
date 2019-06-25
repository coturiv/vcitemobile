import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViolationListModal } from './violation-list.modal';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule
  ],
  declarations: [ViolationListModal],
  entryComponents: [
    ViolationListModal
  ]
})
export class ViolationListModalModule {}
