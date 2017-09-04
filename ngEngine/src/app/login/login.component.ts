import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../share/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm;

  loginInfo = {
    username: '',
    password: '',
    autoLogin: false
  };

  errorMessage = '';

  constructor(
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.autoLogin();
  }

  doLogin() {
    if (this.loginForm.valid) {
      return this._userService.doLogin(this.loginInfo.username, this.loginInfo.password, this.loginInfo.autoLogin)
        .subscribe(res => {
          if (res.status === 1) {
            this.errorMessage = res.message;
            this.router.navigate(['/home/category']);
          } else {
            this.errorMessage = res.message;
          }
        });
    } else {
      this.errorMessage = '请将表单填写完整';
    }
  }

  autoLogin() {
    return this._userService.doLogin(' ', ' ', false)
      .subscribe(res => {
        if (res.status === 1) {
          this.router.navigate(['/home/category']);
        }
      });
  }
}
