import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbookdetailPopupComponent } from './viewbookdetail-popup.component';

describe('ViewbookdetailPopupComponent', () => {
  let component: ViewbookdetailPopupComponent;
  let fixture: ComponentFixture<ViewbookdetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewbookdetailPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbookdetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
