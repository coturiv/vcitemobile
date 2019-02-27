import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CitationPage } from './citation.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { TabVehicleComponent } from './tab-vehicle/tab-vehicle.component';
import { TabViolationComponent } from './tab-violation/tab-violation.component';
import { TabPhotosComponent } from './tab-photos/tab-photos.component';
import { TabReviewComponent } from './tab-review/tab-review.component';
import { ViolationListModalModule } from './violation-list/violation-list.module';
import { AbstractComponent } from './abstract.component';

const routes: Routes = [
  {
    path: '',
    component: CitationPage
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
  declarations: [
    CitationPage, 
    TabVehicleComponent, 
    TabViolationComponent, 
    TabPhotosComponent, 
    TabReviewComponent,
    AbstractComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CitationPageModule {}
