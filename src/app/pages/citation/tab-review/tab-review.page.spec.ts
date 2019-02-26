import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabReviewPage } from './tab-review.page';

describe('TabReviewPage', () => {
  let component: TabReviewPage;
  let fixture: ComponentFixture<TabReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabReviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
