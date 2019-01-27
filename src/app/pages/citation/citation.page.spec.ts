import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitationPage } from './citation.page';

describe('CitationPage', () => {
  let component: CitationPage;
  let fixture: ComponentFixture<CitationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
