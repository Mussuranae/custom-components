import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativeBannerComponent } from './informative-banner.component';

describe('InformativeBannerComponent', () => {
  let component: InformativeBannerComponent;
  let fixture: ComponentFixture<InformativeBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformativeBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformativeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
