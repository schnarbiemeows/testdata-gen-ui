import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WholenumFormComponent } from './wholenum-form.component';

describe('WholenumFormComponent', () => {
  let component: WholenumFormComponent;
  let fixture: ComponentFixture<WholenumFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WholenumFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WholenumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
