import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  currentUsernameLogout = localStorage.getItem('currentUsername');
  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    window.localStorage.clear();
    window.location.reload();
  }

}
