import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ShowHideContainer } from './show-hide-container';
import { ShowHideInput } from './show-hide-input';
import { VehSelectComponent } from './veh-select/veh-select.component';

@NgModule({
  declarations: [
    ShowHideContainer, 
    ShowHideInput, 
    VehSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot()
  ],
  exports: [
    ShowHideContainer, 
    ShowHideInput,
    VehSelectComponent
  ]
})
export class ComponentsModule { }
