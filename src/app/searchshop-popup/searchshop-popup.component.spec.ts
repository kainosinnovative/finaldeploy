import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchshopPopupComponent } from './searchshop-popup.component';

describe('SearchshopPopupComponent', () => {
  let component: SearchshopPopupComponent;
  let fixture: ComponentFixture<SearchshopPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchshopPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchshopPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
