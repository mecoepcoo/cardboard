/**
 * 项目相关服务
 * Created by Tianzhen on 2017/9/5.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Config } from './config';
import { Item } from '../modal/item';

@Injectable()
export class ItemService {

  constructor(
    private http: Http,
  ) {  }

  /**
   * 获取分类对应的项目列表
   * @returns {Observable<any>}
   */
  getItemList(id): Observable<any> {
    const url = `${Config.apiRoot}items?cid=${id}`;
    return this.http.get(url)
      .map(this.extraData)
      .catch(this.handleError);
  }

  /**
   * 添加项目
   * @param {string} categoryId 目录id
   * @param {Item} item 项目信息
   * @returns {Observable<any>}
   */
  addItem(categoryId: string, item: Item): Observable<any> {
    const data = item;
    data.cid = categoryId;
    const url = `${Config.apiRoot}items`;
    const body = JSON.stringify({
      item: data
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(url, body, options)
      .map(this.extraData)
      .catch(this.handleError);
  }

  saveItem(item): Observable<any> {
    const url = `${Config.apiRoot}items`;
    const body = JSON.stringify(item);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.put(url, body, options)
      .map(this.extraData)
      .catch(this.handleError);
  }

/*  doLogout(): Observable<any> {
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
