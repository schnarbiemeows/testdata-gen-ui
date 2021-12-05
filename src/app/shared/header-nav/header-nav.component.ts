import { Component, OnInit } from "@angular/core";


@Component({
  selector: 'header-nav',
  templateUrl: './header-nav.component.html'
})
export class HeaderNavComponent implements OnInit {
  isLoggedIn: boolean = false;
  isOnAdminDashboard: boolean;
  currentUrl: string;

  constructor() { }

  ngOnInit() {

  }


}
