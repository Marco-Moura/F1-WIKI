import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerLayoutComponent } from './career-layout.component';

describe('CareerLayoutComponent', () => {
  let component: CareerLayoutComponent;
  let fixture: ComponentFixture<CareerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
