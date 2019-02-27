import { Component } from '@angular/core';
import { AbstractComponent } from '../abstract.component';

@Component({
  selector: 'tab-vehicle',
  templateUrl: './tab-vehicle.component.html',
  styleUrls: ['./tab-vehicle.component.scss']
})
export class TabVehicleComponent extends AbstractComponent {

  constructor() {
    super();
  }

  async ngOnInit() {
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
