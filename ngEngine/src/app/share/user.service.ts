import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Config } from '../share/config';

@Injectable()
export class UserService {

  constructor(
    private http: Http,
  ) {  }

  /**
   * 登录操作
   * @param username 用户名
   * @param password 密码（明文）
   * @param auto 自动登录
   * @returns {Observable<R|T>}
   * req demo: http://localhost:3308/login?username=admin&password=admin
   */
  doLogin(username: string, password: string, auto: boolean): Observable<any> {
    let autoFlag = auto ? 1 : 0;
    const url = `${Config.apiRoot}login?username=${username}&password=${password}&auto=${autoFlag}`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  /**
   * 修改用户名及密码
   * @param {object} userInfo 用户名及密码键值对
   * @returns {Observable<R|T>}
   * req demo: http://localhost:3308/login
   * body: {
   *   username: admin,
   *   password: admin
   * }
   */
  setUser(userInfo): Observable<any> {
    const url = `${Config.apiRoot}login`;
    const body = JSON.stringify(userInfo);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(url, body, options)
      .map(this.extraData)
      .catch(this.handleError);
  }

  /**
   * 重置用户名密码为 admin, admin
   * @param {object} secretKey 安全口令
   * @returns {Observable<R|T>}
   * req demo: http://localhost:3308/login
   * body: {
   *   key: secretKey
   * }
   */
  resetUser(secretKey): Observable<any> {
    const url = `${Config.apiRoot}login`;
    const body = JSON.stringify(secretKey);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.put(url, body, options)
      .map(this.extraData)
      .catch(this.handleError);
  }

  private extraData(res) {
    const body = res.json();
    return body || [];
  }

  private handleError (error) {
    const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : `Server error`;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
