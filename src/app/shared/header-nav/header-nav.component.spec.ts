import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNavComponent } from './header-nav.component';
import {AuthenticationServiceStub} from "../../../testing/authentication-service-stub";
import {NotificationServiceStub} from "../../../testing/notification-service-stub";
import {NotificationService} from "../../services/notification/notification.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {RouterTestingModule} from "@angular/router/testing";

describe('HeaderNavComponent', () => {
  let component: HeaderNavComponent;
  let fixture: ComponentFixture<HeaderNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ HeaderNavComponent ],
      providers: [
    { provide: NotificationService, useClass: NotificationServiceStub},
    { provide: AuthenticationService, useClass: AuthenticationServiceStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log out and no longer be on the admin dashboard', () => {
    component.onLogOut();
    let trueOrFalse:boolean = component.isOnAdminDashboard;
    expect(trueOrFalse).toBeFalse();
  });
});
