import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewinsertpageComponent } from './newinsertpage.component';

describe('NewinsertpageComponent', () => {
  let component: NewinsertpageComponent;
  let fixture: ComponentFixture<NewinsertpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewinsertpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewinsertpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
