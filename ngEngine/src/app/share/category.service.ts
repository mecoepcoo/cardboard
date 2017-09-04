/**
 * 分类相关服务
 * Created by Tianzhen on 2017/9/4.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Config } from './config';

@Injectable()
export class CategoryService {

  constructor(
    private http: Http,
  ) {  }

  getCategoryList(): Observable<any> {
    const url = `${Config.apiRoot}category`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  addCategory(categoryName): Observable<any> {
    const url = `${Config.apiRoot}category`;
    const body = JSON.stringify({
      name: categoryName
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(url, body, options)
      .map(this.extraData)
      .catch(this.handleError);
  }

/*  setUser(userInfo): Observable<any> {
    const url = `${Config.apiRoot}login`;
    const body = JSON.stringify(userInfo);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(url, body, options)
      .map(this.extraData)
      .catch(this.handleError);
  }

  doLogout(): Observable<any> {
    const url = `${Config.apiRoot}login`;
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({
      headers: headers,
    });

    return this.http.delete(url, options)
      .map(this.extraData)
      .catch(this.handleError);
  }*/

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
