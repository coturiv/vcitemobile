import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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
    await this.loadData();
  }

  navigateTo(url: string) {
    this.navCtrl.navigateForward(url);
  }

  async loadData(event?: any) {
    this.citations = await this.citationService.getCitations();
    
    if (event) {
      event.target.complete();
    }
  }

}
