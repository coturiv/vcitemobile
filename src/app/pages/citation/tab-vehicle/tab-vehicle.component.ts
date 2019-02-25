import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Citation } from 'src/app/entities';

@Component({
  selector: 'tab-vehicle',
  templateUrl: './tab-vehicle.component.html',
  styleUrls: ['./tab-vehicle.component.scss']
})
export class TabVehicleComponent implements OnInit, OnDestroy {
  @Input()
  citation: Citation;

  constructor() { }

  ngOnInit() {
  }
  
  async ngOnDestroy() {
    await this.citation.save();
  }

  /**
   * Convert input text to uppercase
   * 
   * @param event 
   */
  inputToUppercase(event: any) {
    event.target.value = (event.target.value as string).toUpperCase();
  }

}
