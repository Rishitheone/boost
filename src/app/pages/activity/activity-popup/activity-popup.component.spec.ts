import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPopupComponent } from './activity-popup.component';

describe('ActivityPopupComponent', () => {
  let component: ActivityPopupComponent;
  let fixture: ComponentFixture<ActivityPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
