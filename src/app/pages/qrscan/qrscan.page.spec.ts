import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrscanPage } from './qrscan.page';

describe('QrscanPage', () => {
  let component: QrscanPage;
  let fixture: ComponentFixture<QrscanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrscanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrscanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
