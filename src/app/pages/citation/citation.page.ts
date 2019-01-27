import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Citation, VehState } from 'src/app/entity';

@Component({
  selector: 'app-citation',
  templateUrl: './citation.page.html',
  styleUrls: ['./citation.page.scss'],
})
export class CitationPage implements OnInit {

  curSegment: 'vehicle' | 'violation' | 'photos' | 'review' = 'vehicle';

  citation: any = {};

  constructor(private route: ActivatedRoute) { }

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

  onSubmit() {
    console.log(this.citation);

    // this.generateXML({});
  }

  /**
   * generate xml from a json data
   * 
   * @param objData any
   */
  private generateXML(objData: Object | any) {

  }

}
