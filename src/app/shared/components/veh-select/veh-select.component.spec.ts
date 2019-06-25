import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehSelectComponent } from './veh-select.component';

describe('VehSelectComponent', () => {
  let component: VehSelectComponent<any>;
  let fixture: ComponentFixture<VehSelectComponent<any>>;

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
