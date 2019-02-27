import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabViolationComponent } from './tab-violation.component';

describe('TabViolationComponent', () => {
  let component: TabViolationComponent;
  let fixture: ComponentFixture<TabViolationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabViolationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabViolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
