import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavefromtotimeComponent } from './leavefromtotime.component';

describe('LeavefromtotimeComponent', () => {
  let component: LeavefromtotimeComponent;
  let fixture: ComponentFixture<LeavefromtotimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavefromtotimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavefromtotimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
