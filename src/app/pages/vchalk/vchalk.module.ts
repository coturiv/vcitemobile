import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VchalkPage } from './vchalk.page';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

const routes: Routes = [
  {
    path: '',
    component: VchalkPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    PdfViewerModule
  ],
  declarations: [VchalkPage]
})
export class VchalkPageModule {}
