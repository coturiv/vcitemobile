import { Component, ContentChild, ViewEncapsulation } from '@angular/core';
import { ShowHideInputDirective } from './show-hide-input';

@Component({
  selector: 'show-hide-container',
  template: `
    <ng-content></ng-content>
    <ion-buttons slot="end" class="toggle-button">
      <ion-button color="primary" (click)="toggleShow()">

        <ion-icon slot="icon-only" [src]="(show ? 'eye-off':'eye') | icomoon: 'blue'" class="color-trans"></ion-icon>
      </ion-button>
    </ion-buttons>
  `,
  styles: [`
    .toggle-button {
      margin-top: -36px;
      padding-bottom: 12px;
      float: right;
      color: var(--theme-blue) !important;

    }
    ion-icon {
      font-size: 24px !important;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class ShowHideContainer {
  show = false;

  @ContentChild(ShowHideInputDirective) input: ShowHideInputDirective;

  constructor() {}

  toggleShow() {
    this.show = !this.show;

    if (this.show) {
      this.input.changeType('text');
    } else {
      this.input.changeType('password');
    }
  }
}
