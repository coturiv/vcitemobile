import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehLocationComponent } from './veh-location.component';

describe('VehLocationComponent', () => {
  let component: VehLocationComponent;
  let fixture: ComponentFixture<VehLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
