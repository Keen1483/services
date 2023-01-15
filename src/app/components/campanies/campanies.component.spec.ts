import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaniesComponent } from './campanies.component';

describe('CampaniesComponent', () => {
  let component: CampaniesComponent;
  let fixture: ComponentFixture<CampaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
