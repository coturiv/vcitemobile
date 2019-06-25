import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReferencePage } from './reference.page';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

const routes: Routes = [
  {
    path: '',
    component: ReferencePage
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
  declarations: [ReferencePage]
})
export class ReferencePageModule {}
