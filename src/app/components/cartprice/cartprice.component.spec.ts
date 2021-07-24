import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartpriceComponent } from './cartprice.component';

describe('CartpriceComponent', () => {
  let component: CartpriceComponent;
  let fixture: ComponentFixture<CartpriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartpriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
