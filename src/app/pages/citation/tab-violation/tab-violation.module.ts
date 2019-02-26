import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabViolationPage } from './tab-violation.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ViolationListModalModule } from './violation-list/violation-list.module';

const routes: Routes = [
  {
    path: '',
    component: TabViolationPage
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

    ViolationListModalModule
  ],
  declarations: [TabViolationPage]
})
export class TabViolationPageModule {}
