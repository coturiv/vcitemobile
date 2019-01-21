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
            loadChildren: './vehicle/vehicle.module#VehiclePageModule'
          }
        ]
      },
      {
        path: 'violation',
        children: [
          {
            path: '',
            loadChildren: './violation/violation.module#ViolationPageModule'
          }
        ]
      },
      {
        path: 'photos',
        children: [
          {
            path: '',
            loadChildren: './photos/photos.module#PhotosPageModule'
          }
        ]
      },
      {
        path: 'review',
        children: [
          {
            path: '',
            loadChildren: './review/review.module#ReviewPageModule'
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
