import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'empty-content',
  template: `
    <div text-center>
      <ion-icon [name]="icon"></ion-icon>
      <p>{{text}}</p>
    </div>
  `,
  styles: [`
    div {
      margin-top: 20vh;
      padding: 16px;


    }
    div > ion-icon {
      font-size: 3.0rem;
      opacity: .4;
    }

    div > p {
      font-size: 12pt;
      opacity: .7;
      padding: 20px 5px;
      line-height: 1.2;
    }
  `],
})
export class EmptyContentComponent implements OnInit {

  @Input()
  icon: string;

  @Input()
  text: string;

  constructor() { }

  ngOnInit() {}

}
