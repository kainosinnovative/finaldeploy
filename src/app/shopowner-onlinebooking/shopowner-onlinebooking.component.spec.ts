import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopownerOnlinebookingComponent } from './shopowner-onlinebooking.component';

describe('ShopownerOnlinebookingComponent', () => {
  let component: ShopownerOnlinebookingComponent;
  let fixture: ComponentFixture<ShopownerOnlinebookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopownerOnlinebookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopownerOnlinebookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
