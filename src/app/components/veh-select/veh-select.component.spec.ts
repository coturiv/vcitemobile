import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehSelectComponent } from './veh-select.component';

describe('VehSelectComponent', () => {
  let component: VehSelectComponent;
  let fixture: ComponentFixture<VehSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
