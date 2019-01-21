import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolationPage } from './violation.page';

describe('ViolationPage', () => {
  let component: ViolationPage;
  let fixture: ComponentFixture<ViolationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViolationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViolationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
