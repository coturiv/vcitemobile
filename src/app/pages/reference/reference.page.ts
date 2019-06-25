import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.page.html',
  styleUrls: ['./reference.page.scss'],
})
export class ReferencePage implements OnInit {
  reference = 'assets/pdfs/lynnpark_vcitemobile_reference.pdf';

  constructor() { }

  ngOnInit() {
  }

}
