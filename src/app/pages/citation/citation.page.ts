import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitationService } from 'src/app/services/citation.service';

@Component({
  selector: 'app-citation',
  templateUrl: './citation.page.html',
  styleUrls: ['./citation.page.scss'],
})
export class CitationPage implements OnInit {

  constructor(private route: ActivatedRoute, private citationService: CitationService) { }

  ngOnInit() {
    const {cId} = this.route.snapshot.params;

    if (cId) {
      this.citationService.currentId = cId;
    }
  }

}
