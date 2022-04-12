import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpverfiedComponent } from './otpverfied.component';

describe('OtpverfiedComponent', () => {
  let component: OtpverfiedComponent;
  let fixture: ComponentFixture<OtpverfiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpverfiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpverfiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
