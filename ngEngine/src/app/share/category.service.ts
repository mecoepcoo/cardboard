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

  /**
   * 获取分类列表
   * @returns {Observable<any>}
   */
  getCategoryList(): Observable<any> {
    const url = `${Config.apiRoot}category`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  /**
   * 通过id获取分类信息
   * @param id
   * @returns {Observable<any>}
   */
  getCategory(id): Observable<any> {
    const url = `${Config.apiRoot}category/${id}`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  /**
   * 新增分类
   * @param categoryName 分类名称
   * @returns {Observable<any>}
   */
  addCategory(categoryName: string): Observable<any> {
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

  saveCategory(id: string, name: string, unit: string): Observable<any> {
    const url = `${Config.apiRoot}category`;
    const body = JSON.stringify({
      id: id,
      name: name,
      unit: unit
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.put(url, body, options)
      .map(this.extraData)
      .catch(this.handleError);
  }

  removeCategory(id: string): Observable<any> {
    const url = `${Config.apiRoot}category`;
    const body = JSON.stringify({
      id: id
    });
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({
      headers: headers,
      body: body
    });

    return this.http.delete(url, options)
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
