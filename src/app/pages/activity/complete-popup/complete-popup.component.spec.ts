import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletePopupComponent } from './complete-popup.component';

describe('CompletePopupComponent', () => {
  let component: CompletePopupComponent;
  let fixture: ComponentFixture<CompletePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
