import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ShowHideContainer } from './show-hide-container';
import { ShowHideInputDirective } from './show-hide-input';
import { VehSelectComponent } from './veh-select/veh-select.component';
import { PipesModule } from '../pipes/pipes.module';
import { EmptyContentComponent } from './empty-content/empty-content.component';

@NgModule({
  declarations: [
    ShowHideContainer,
    ShowHideInputDirective,
    VehSelectComponent,
    EmptyContentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    PipesModule,
  ],
  entryComponents: [
  ],
  exports: [
    ShowHideContainer,
    ShowHideInputDirective,
    VehSelectComponent,
    EmptyContentComponent
  ]
})
export class ComponentsModule { }
