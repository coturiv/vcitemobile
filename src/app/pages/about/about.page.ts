import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {
  version: string = '0.0.1';
  today: Date     = new Date();
  company: string = 'PenFormsUSA Inc.';

}
