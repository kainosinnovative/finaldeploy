import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutchartnewComponent } from './donutchartnew.component';

describe('DonutchartnewComponent', () => {
  let component: DonutchartnewComponent;
  let fixture: ComponentFixture<DonutchartnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonutchartnewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutchartnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
