import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoploginComponent } from './shoplogin.component';

describe('ShoploginComponent', () => {
  let component: ShoploginComponent;
  let fixture: ComponentFixture<ShoploginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoploginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoploginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
