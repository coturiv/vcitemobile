import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ShowHideContainer } from './show-hide-container';
import { ShowHideInput } from './show-hide-input';
import { VehSelectComponent } from './veh-select/veh-select.component';
import { VehLocationComponent } from './veh-location/veh-location.component';
import { VehLocationModal } from './veh-location/veh-location.modal';
import { AutoSizeDirective } from './auto-size.directive';

@NgModule({
  declarations: [
    ShowHideContainer, 
    ShowHideInput, 
    VehSelectComponent, 
    VehLocationComponent,
    VehLocationModal,
    AutoSizeDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot()
  ],
  entryComponents: [
    VehLocationModal
  ],
  exports: [
    ShowHideContainer, 
    ShowHideInput,
    VehSelectComponent,
    VehLocationComponent,
    AutoSizeDirective
  ]
})
export class ComponentsModule { }
