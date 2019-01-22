import { Component, ContentChild, ViewEncapsulation } from '@angular/core';
import { ShowHideInput } from './show-hide-input'

@Component({
  selector: 'show-hide-container',
  template: `
    <ng-content></ng-content>
    <ion-buttons slot="end" class="toggle-button">
      <ion-button color="primary" (click)="toggleShow()">
        <ion-icon slot="icon-only" name="eye" [hidden]="show"></ion-icon>
        <ion-icon slot="icon-only" name="eye-off" [hidden]="!show"></ion-icon>
      </ion-button>
    </ion-buttons>
  `,
  styles: [`
    .toggle-button {
      margin-top: -36px;
      padding-bottom: 12px;
      float: right;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class ShowHideContainer {
  show = false;

  @ContentChild(ShowHideInput) input: ShowHideInput;

  constructor() {}

  toggleShow() {
    this.show = !this.show;
    
    if (this.show) {
      this.input.changeType("text");
    }
    else {
      this.input.changeType("password");
    }
  }
}
