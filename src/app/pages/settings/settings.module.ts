import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { AccordionListModule } from 'ionic4-kits';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    PipesModule,
    AccordionListModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
