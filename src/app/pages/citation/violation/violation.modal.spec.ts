import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolationModal } from './violation.modal';

describe('ViolationModal', () => {
  let component: ViolationModal;
  let fixture: ComponentFixture<ViolationModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViolationModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViolationModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
