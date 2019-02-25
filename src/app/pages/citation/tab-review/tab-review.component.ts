import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Citation } from 'src/app/entities';

@Component({
  selector: 'tab-review',
  templateUrl: './tab-review.component.html',
  styleUrls: ['./tab-review.component.scss']
})
export class TabReviewComponent implements OnInit, OnDestroy {
  
  @Input()
  citation: Citation;

  @Output()
  onSubmit: EventEmitter<any>;

  constructor() {
    this.onSubmit = new EventEmitter();
  }

  ngOnInit() {
  }

  async ngOnDestroy() {
    await this.citation.save();
  }

  submit() {
    this.onSubmit.emit();
  }

}
