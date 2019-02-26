import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VchalkPage } from './vchalk.page';

describe('VchalkPage', () => {
  let component: VchalkPage;
  let fixture: ComponentFixture<VchalkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VchalkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VchalkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
