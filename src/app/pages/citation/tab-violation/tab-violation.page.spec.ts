import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabViolationPage } from './tab-violation.page';

describe('TabViolationPage', () => {
  let component: TabViolationPage;
  let fixture: ComponentFixture<TabViolationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabViolationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabViolationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
