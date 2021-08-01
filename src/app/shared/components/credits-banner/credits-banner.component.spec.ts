import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsBannerComponent } from './credits-banner.component';

describe('CreditsBannerComponent', () => {
  let component: CreditsBannerComponent;
  let fixture: ComponentFixture<CreditsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditsBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
