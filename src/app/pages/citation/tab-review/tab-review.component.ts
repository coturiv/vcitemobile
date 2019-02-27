import { Component, Output, EventEmitter } from '@angular/core';
import { AbstractComponent } from '../abstract.component';

@Component({
  selector: 'tab-review',
  templateUrl: './tab-review.component.html',
  styleUrls: ['./tab-review.component.scss']
})
export class TabReviewComponent extends AbstractComponent {

  @Output()
  submitClick: EventEmitter<any>;

  constructor() {
    super();

    this.submitClick = new EventEmitter();
  }

  submit() {
    this.submitClick.emit();
  }

  async ngOnDestroy() {}

}
