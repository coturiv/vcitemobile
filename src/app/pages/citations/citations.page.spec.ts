import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitationsPage } from './citations.page';

describe('CitationsPage', () => {
  let component: CitationsPage;
  let fixture: ComponentFixture<CitationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
