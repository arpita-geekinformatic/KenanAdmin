import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrowseinspectionComponent } from './add-browseinspection.component';

describe('AddBrowseinspectionComponent', () => {
  let component: AddBrowseinspectionComponent;
  let fixture: ComponentFixture<AddBrowseinspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBrowseinspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBrowseinspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
