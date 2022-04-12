import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutstackblitzComponent } from './doughnutstackblitz.component';

describe('DoughnutstackblitzComponent', () => {
  let component: DoughnutstackblitzComponent;
  let fixture: ComponentFixture<DoughnutstackblitzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoughnutstackblitzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutstackblitzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
