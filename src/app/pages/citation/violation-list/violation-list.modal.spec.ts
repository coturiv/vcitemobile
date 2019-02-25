import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolationListModal } from './violation-list.modal';

describe('ViolationListModal', () => {
  let component: ViolationListModal;
  let fixture: ComponentFixture<ViolationListModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViolationListModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViolationListModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
