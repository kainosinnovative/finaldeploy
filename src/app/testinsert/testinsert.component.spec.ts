import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestinsertComponent } from './testinsert.component';

describe('TestinsertComponent', () => {
  let component: TestinsertComponent;
  let fixture: ComponentFixture<TestinsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestinsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestinsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
