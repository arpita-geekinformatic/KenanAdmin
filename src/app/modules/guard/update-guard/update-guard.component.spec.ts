import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGuardComponent } from './update-guard.component';

describe('UpdateGuardComponent', () => {
  let component: UpdateGuardComponent;
  let fixture: ComponentFixture<UpdateGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGuardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
