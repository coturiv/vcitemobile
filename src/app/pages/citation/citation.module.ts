import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CitationPage } from './citation.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CitationTab } from './citation.tab';

const routes: Routes = [
  {
    path: '',
    component: CitationPage,
    children: [
      {
        path: 'vehicle',
        children: [
          {
            path: '',
            loadChildren: './tab-vehicle/tab-vehicle.module#TabVehiclePageModule'
          }
        ]
      },
      {
        path: 'violation',
        children: [
          {
            path: '',
            loadChildren: './tab-violation/tab-violation.module#TabViolationPageModule'
          }
        ]
      },
      {
        path: 'photos',
        children: [
          {
            path: '',
            loadChildren: './tab-photos/tab-photos.module#TabPhotosPageModule'
          }
        ]
      },
      {
        path: 'review',
        children: [
          {
            path: '',
            loadChildren: './tab-review/tab-review.module#TabReviewPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/vehicle',
        pathMatch: 'full'
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [CitationPage, CitationTab]
})
export class CitationPageModule {}
