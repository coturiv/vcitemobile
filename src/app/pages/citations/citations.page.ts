import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { Citation } from 'src/app/entities';
import { CitationService } from 'src/app/services/citation.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-citations',
  templateUrl: './citations.page.html',
  styleUrls: ['./citations.page.scss'],
})
export class CitationsPage implements OnInit {
  today = new Date();

  citations: Citation[];

  constructor(
    private navCtrl: NavController, 
    private citationService: CitationService, 
    private authService: AuthService,
    private commonService: CommonService
  ) { }

  async ngOnInit() {
    if (!this.authService.loginInfo) {
      this.navCtrl.navigateRoot('login');
    }

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
  
  async clearLog(citations: Citation[]) {
    this.commonService.showConfirm('Are you sure you want to remove this citation from the log?', 'Confirm', async() => {
      try {
        citations.forEach(async citation => {
          citation.is_visible = false;
          await citation.save();
        })
      } catch(e) {

      }
    });
  }

  private isCitationValid(citation: Citation): boolean {
    return true;
  }

}
