import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm;

  loginInfo = {
    username: '',
    password: '',
    autoLogin: false
  };

  login() {
/*    return this._adminuserService.getAdminusers()
      .subscribe(datas => {

      })*/
  }


}
