import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import { Citation } from 'src/app/entity';
import { CitationService } from 'src/app/services/citation.service';

@Component({
  selector: 'app-citations',
  templateUrl: './citations.page.html',
  styleUrls: ['./citations.page.scss'],
})
export class CitationsPage implements OnInit {
  today = new Date();

  citations: Citation[];

  constructor(private navCtrl: NavController, private citationService: CitationService) { }

  async ngOnInit() {
    // this.citations = this.apiService.get<Citation[]>('assets/data/citations.json');
    this.citations = await this.citationService.getCitations();
  }

  navigateTo(url: string) {
    this.navCtrl.navigateForward(url);
  }

}
