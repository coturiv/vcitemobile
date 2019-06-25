import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CitationsPage } from './citations.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { Ionic4KitsModule } from 'ionic4-kits';

const routes: Routes = [
  {
    path: '',
    component: CitationsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    PipesModule,
    Ionic4KitsModule,
  ],
  declarations: [CitationsPage]
})
export class CitationsPageModule {}
