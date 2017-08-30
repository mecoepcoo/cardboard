/**
 * 联动复选框指令
 * Created by Tianzhen on 2017/8/30.
 */
import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appCheckedAll]'
})
export class CheckedAllDirective implements AfterViewInit {
  private checkTable: any;

  constructor(private el: ElementRef) {
    this.checkTable = el.nativeElement;
  }

  ngAfterViewInit() {
    let checkAll = this.checkTable.getElementsByClassName('check-all');
    let checkBoxes = this.checkTable.getElementsByClassName('check');
    checkAll[0].onclick = () => {
      for (let checkBox of checkBoxes) {
        if (checkAll.checked) {
          checkBox.checked = false;
        } else {
          checkBox.checked = true;
        }
      }
      checkAll.checked = !checkAll.checked;
    };
  }
}
