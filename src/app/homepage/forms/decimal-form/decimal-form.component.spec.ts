import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecimalFormComponent } from './decimal-form.component';

describe('DecimalFormComponent', () => {
  let component: DecimalFormComponent;
  let fixture: ComponentFixture<DecimalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecimalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecimalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
