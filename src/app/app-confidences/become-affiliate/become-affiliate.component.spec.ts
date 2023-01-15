import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeAffiliateComponent } from './become-affiliate.component';

describe('BecomeAffiliateComponent', () => {
  let component: BecomeAffiliateComponent;
  let fixture: ComponentFixture<BecomeAffiliateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeAffiliateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeAffiliateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
