import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Citation } from 'src/app/entities';
import { throwAppError } from 'src/app/shared/error-handler';

@Component({
  selector: 'tab-abstract',
  template: ''
})
export class AbstractComponent implements OnInit, OnDestroy {

  @Input()
  citation: Citation;

  constructor() { }

  async ngOnInit() {

  }

  async ngOnDestroy() {
    try {
      this.citation.timestamp = String(Date.now());
      this.citation.is_visible = true;

      await this.citation.save();
    } catch (e) {
      throwAppError('DB_ENTITY_UPDATE_FAILED');
    }
  }

}
