import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import { Citation } from 'src/app/entity';

@Component({
  selector: 'app-citations',
  templateUrl: './citations.page.html',
  styleUrls: ['./citations.page.scss'],
})
export class CitationsPage implements OnInit {
  today = new Date();

  citations: Observable<Citation[]>;

  constructor(private navCtrl: NavController, private apiService: ApiService) { }

  ngOnInit() {
    this.citations = this.apiService.get<Citation[]>('assets/data/citations.json');

    this.citations.subscribe(res => {
      console.log(res);
    })
  }

  navigateTo(url: string) {
    this.navCtrl.navigateForward(url);
  }

}
