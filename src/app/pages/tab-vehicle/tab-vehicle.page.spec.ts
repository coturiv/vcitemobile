import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabVehiclePage } from './tab-vehicle.page';

describe('TabVehiclePage', () => {
  let component: TabVehiclePage;
  let fixture: ComponentFixture<TabVehiclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabVehiclePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabVehiclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
