import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationListModal } from './location-list.modal';

describe('LocationListModal', () => {
  let component: LocationListModal;
  let fixture: ComponentFixture<LocationListModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationListModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationListModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
