import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseinspectionComponent } from './browseinspection.component';

describe('BrowseinspectionComponent', () => {
  let component: BrowseinspectionComponent;
  let fixture: ComponentFixture<BrowseinspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseinspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseinspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
