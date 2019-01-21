import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: ':cid',
    component: TabsPage,
    children: [
      {
        path: 'vehicle',
        children: [
          {
            path: '',
            loadChildren: '../tab-vehicle/tab-vehicle.module#TabVehiclePageModule'
          }
        ]
      },
      {
        path: 'violation',
        children: [
          {
            path: '',
            loadChildren: '../tab-violation/tab-violation.module#TabViolationPageModule'
          }
        ]
      },
      {
        path: 'photos',
        children: [
          {
            path: '',
            loadChildren: '../tab-photos/tab-photos.module#TabPhotosPageModule'
          }
        ]
      },
      {
        path: 'review',
        children: [
          {
            path: '',
            loadChildren: '../tab-review/tab-review.module#TabReviewPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/:cid/vehicle',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/:cid',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
