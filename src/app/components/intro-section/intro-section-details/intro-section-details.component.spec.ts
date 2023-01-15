import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroSectionDetailsComponent } from './intro-section-details.component';

describe('IntroSectionDetailsComponent', () => {
  let component: IntroSectionDetailsComponent;
  let fixture: ComponentFixture<IntroSectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroSectionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroSectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
