import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationListModal } from './location-list.modal';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
  ],
  declarations: [LocationListModal],
  entryComponents: [
    LocationListModal
  ]
})
export class LocationListModalModule {}
