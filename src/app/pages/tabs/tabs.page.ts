import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  citation: any = 12;
  cid: number;

  errorTitle: 'Not Exists';

  constructor(private route: ActivatedRoute) {
    this.cid = this.route.snapshot.params['cid'];
  }
}
