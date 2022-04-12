import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbookingdetailsComponent } from './viewbookingdetails.component';

describe('ViewbookingdetailsComponent', () => {
  let component: ViewbookingdetailsComponent;
  let fixture: ComponentFixture<ViewbookingdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewbookingdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbookingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
