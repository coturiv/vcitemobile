import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPhotosComponent } from './tab-photos.component';

describe('TabPhotosComponent', () => {
  let component: TabPhotosComponent;
  let fixture: ComponentFixture<TabPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
