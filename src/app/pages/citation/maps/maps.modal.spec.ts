import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsModal } from './maps.modal';

describe('MapsModal', () => {
  let component: MapsModal;
  let fixture: ComponentFixture<MapsModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
