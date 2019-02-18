import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehLocationModal } from './veh-location.modal';

describe('VehLocationModal', () => {
  let component: VehLocationModal;
  let fixture: ComponentFixture<VehLocationModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehLocationModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehLocationModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
