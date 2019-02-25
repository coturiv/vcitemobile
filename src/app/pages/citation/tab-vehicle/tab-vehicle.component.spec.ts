import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabVehicleComponent } from './tab-vehicle.component';

describe('TabVehicleComponent', () => {
  let component: TabVehicleComponent;
  let fixture: ComponentFixture<TabVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
