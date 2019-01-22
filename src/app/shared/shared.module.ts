import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpInterceptor } from './http-interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    HttpInterceptor
  ]
})
export class SharedModule { }
