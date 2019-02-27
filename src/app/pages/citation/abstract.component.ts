import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Citation } from 'src/app/entities';

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
    await this.citation.save();
  }

}