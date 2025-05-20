import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesTermsComponent } from './services-terms.component';

describe('ServicesTermsComponent', () => {
  let component: ServicesTermsComponent;
  let fixture: ComponentFixture<ServicesTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesTermsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
