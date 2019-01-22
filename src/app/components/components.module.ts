import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ShowHideContainer } from './show-hide-container';
import { ShowHideInput } from './show-hide-input';

@NgModule({
  declarations: [
    ShowHideContainer, 
    ShowHideInput
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  exports: [
    ShowHideContainer, 
    ShowHideInput
  ]
})
export class ComponentsModule { }
