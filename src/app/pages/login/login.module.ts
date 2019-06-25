import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
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
  ],
  declarations: [LoginPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LoginPageModule {}
