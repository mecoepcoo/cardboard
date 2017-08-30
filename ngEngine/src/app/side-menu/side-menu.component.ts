import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.css']
})
export class SideMenuComponent implements OnInit {
  menuStatus = {
    category: true,
    order: false
  };

  categoryList: any[] = [
    {
      id: '1',
      name: 'KT板',
      num: 10,
      current: true
    },
    {
      id: '2',
      name: 'hello',
      num: 5,
      current: false
    },
    {
      id: '2',
      name: 'hello',
      num: 5,
      current: false
    }
  ];

  orderList: any[] = [
    {
      id: '1',
      name: '新华书店',
      date: 1504080735000,
      current: true
    },
    {
      id: '1',
      name: '新华书店',
      date: 1504080735000,
      current: false
    },
    {
      id: '1',
      name: '新华书店',
      date: 1504080735000,
      current: false
    },
  ];

  constructor(
  ) { }

  ngOnInit() {

  }

  menuSwitch(menu) {
    if (!this.menuStatus[menu]) {
      for (const key in this.menuStatus) {
        if (key === menu) {
          this.menuStatus[key] = true;
        } else {
          this.menuStatus[key] = false;
        }
      }
    }
  }

  selectItem(index, list) {
    if (!list[index].current) {
      for (const item of list) {
        if (item === list[index]) {
          item.current = true;
        } else {
          item.current = false;
        }
      }
    }
  }
}
