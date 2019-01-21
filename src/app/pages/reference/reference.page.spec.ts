import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencePage } from './reference.page';

describe('ReferencePage', () => {
  let component: ReferencePage;
  let fixture: ComponentFixture<ReferencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
