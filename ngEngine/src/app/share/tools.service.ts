/**
 * 工具函数库
 * Created by Tianzhen on 2017/9/4.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class ToolsService {
  /**
   * 去除两端空格
   * @param str 初始字符串
   * @returns {string} 去除空格后的字符串
   */
  trim = (str) => {
    const whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    for (let i = 0, len = str.length; i < len; i++) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(i);
        break;
      }
    }
    for (let i = str.length - 1; i >= 0; i--) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(0, i + 1);
        break;
      }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
  }
}
