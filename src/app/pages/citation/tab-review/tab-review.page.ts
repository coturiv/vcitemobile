import { Component } from '@angular/core';
import { CitationTab } from '../citation.tab';

@Component({
  selector: 'app-tab-review',
  templateUrl: './tab-review.page.html',
  styleUrls: ['./tab-review.page.scss'],
})
export class TabReviewPage extends CitationTab {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
