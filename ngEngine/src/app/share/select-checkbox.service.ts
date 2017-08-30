/**
 * 复选框处理程序，将选中的项存入数组
 * Created by Tianzhen on 2017/8/30.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class SelectCheckboxService {
  selectedCheckbox = [];

  constructor( ) { }

  /* 全选、清空复选框 */
  selectAllCheckbox(checked: boolean, collection, field) {
    this.selectedCheckbox = [];
    if (checked) {
      collection.forEach((doc, index) => {
        this.selectedCheckbox.push(doc[field]);
      });
    }
  }

  /* 整理复选框，将选中的项目id推入数组 */
  selectCheckbox(checked: boolean, value: string) {
    const index: number = this.selectedCheckbox.indexOf(value);
    if (checked) {
      if (index < 0) {
        this.selectedCheckbox.push(value);
      }
    } else {
      if (index > -1) {
        this.selectedCheckbox = this.selectedCheckbox.filter((curValue, index) => {
          return curValue !== value;
        });
      }
    }
  }

  /* 清空复选框数组，在切换页面和分页的时候使用 */
  clearCheckbox() {
    this.selectedCheckbox = [];
  }

}
