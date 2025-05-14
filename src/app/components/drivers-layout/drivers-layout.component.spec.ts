import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversLayoutComponent } from './drivers-layout.component';

describe('DriversLayoutComponent', () => {
  let component: DriversLayoutComponent;
  let fixture: ComponentFixture<DriversLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
