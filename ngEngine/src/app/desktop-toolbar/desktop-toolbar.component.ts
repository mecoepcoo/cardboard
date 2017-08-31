import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../share/user.service';

@Component({
  selector: 'app-desktop-toolbar',
  templateUrl: './desktop-toolbar.component.html',
  styleUrls: ['./desktop-toolbar.css']
})
export class DesktopToolbarComponent implements OnInit {




  constructor(
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  doLogout() {
    return this._userService.doLogout()
      .subscribe(data => {
        this.router.navigate(['/login']);
      });
  }
}
