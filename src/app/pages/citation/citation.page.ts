import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Citation, VehState } from 'src/app/entity';
import { CitationService } from 'src/app/services/citation.service';

@Component({
  selector: 'app-citation',
  templateUrl: './citation.page.html',
  styleUrls: ['./citation.page.scss'],
})
export class CitationPage implements OnInit {

  curSegment: 'vehicle' | 'violation' | 'photos' | 'review' = 'vehicle';

  citation: any = {};

  constructor(private route: ActivatedRoute, private citationService: CitationService) { }

  async ngOnInit() {
    const cid = this.route.snapshot.params['cid'];
    //remove me
    this.citation.id = cid;
    // this.citation = await Citation.findOne({id: cid});

    //remove me
    this.citation.state = (await VehState.findOne()).name;
  }

  segmentChanged(ev: any) {
    this.curSegment = ev.target.value;
  }

  async onSubmit() {
    console.log(this.citation);
    await this.citationService.submitCitation(this.citation);

    // TODO:show success message
  }

}
