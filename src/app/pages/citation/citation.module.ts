import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CitationPage } from './citation.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { AttatchmentModalModule } from './attatchment/attachment.module';

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
    AttatchmentModalModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CitationPage],
})
export class CitationPageModule {}
