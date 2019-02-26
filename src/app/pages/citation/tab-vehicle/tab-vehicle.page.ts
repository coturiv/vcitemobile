import { Component } from '@angular/core';
import { CitationTab } from '../citation.tab';

@Component({
  selector: 'app-tab-vehicle',
  templateUrl: './tab-vehicle.page.html',
  styleUrls: ['./tab-vehicle.page.scss'],
})
export class TabVehiclePage extends CitationTab {

  constructor() {
    super();
  }

  ngOnInit() {
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
