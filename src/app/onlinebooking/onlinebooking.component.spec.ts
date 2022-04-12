import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinebookingComponent } from './onlinebooking.component';

describe('OnlinebookingComponent', () => {
  let component: OnlinebookingComponent;
  let fixture: ComponentFixture<OnlinebookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinebookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinebookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
