import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringFormComponent } from './string-form.component';

describe('StringFormComponent', () => {
  let component: StringFormComponent;
  let fixture: ComponentFixture<StringFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StringFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StringFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
