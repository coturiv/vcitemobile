import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IcomoonPipe } from './icomoon.pipe';

@NgModule({
  declarations: [
    IcomoonPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IcomoonPipe
  ]
})
export class PipesModule { }
