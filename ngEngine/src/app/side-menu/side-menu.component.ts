import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ToolsService } from '../share/tools.service';
import { CategoryService } from '../share/category.service';
import { MessageTipComponent } from '../message-tip/message-tip.component';
import { Config } from '../share/config';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.css']
})
export class SideMenuComponent implements OnInit {
  @ViewChild(MessageTipComponent) messageDialogComponent: MessageTipComponent;

  menuStatus = {
    category: true,
    order: false
  };

  categoryList: any[] = [];

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

  addCategoryName: string;

  mask = {
    display: false
  };

  modal = {
    display: false,
    open: () => {
      this.mask.display = true;
      this.modal.display = true;
    },
    close: () => {
      this.modalText.id = '';
      this.modalText.name = '';
      this.modalText.inputName = '';
      this.mask.display = false;
      this.modal.display = false;
    }
  };

  modalText = {
    id: '',
    name: '',
    inputName: ''
  };

  constructor(
    private _categoryService: CategoryService,
    private _toolsService: ToolsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategoryList()
      .subscribe(() => {
        this.selectItem(0, this.categoryList, this.categoryList[0].id);
      });
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

  selectItem(index: number, list: any[], id: string) {
    if (!list[index].current) {
      for (const item of list) {
        if (item === list[index]) {
          item.current = true;
        } else {
          item.current = false;
        }
      }
    }
    this.router.navigate(['/home/category', id]);
  }

  addCategory(name) {
    const cname = this._toolsService.trim(name);
    return this._categoryService.addCategory(cname)
      .subscribe(data => {
        this.addCategoryName = '';
        this.getCategoryList()
          .subscribe(() => {
            this.selectItem(this.categoryList.length - 1, this.categoryList, this.categoryList[this.categoryList.length - 1].id);
          });
      });
  }

  getCategoryList() {
    return this._categoryService.getCategoryList()
      .map(datas => {
        datas.data.forEach((data, index) => {
          this.categoryList[index] = {};
          this.categoryList[index].id = data.id;
          this.categoryList[index].name = data.name;
          this.categoryList[index].current = false;
        });
      });
  }

  openRemoveCategoryModal(id: string, name: string) {
    this.modalText.inputName = '';
    this.modalText.id = id;
    this.modalText.name = name;
    this.modal.open();
  }

  removeCategory() {
    if (this.modalText.inputName === this.modalText.name) {
      this._categoryService.removeCategory(this.modalText.id)
        .subscribe(datas => {
          this.modal.close();
          this.messageDialogComponent.messageDialog.open(Config.message.SUCCESS, 1);
          this.categoryList = [];
          this.getCategoryList()
            .subscribe(() => {
              this.selectItem(0, this.categoryList, this.categoryList[0].id);
            });
        }, error => {
          this.messageDialogComponent.messageDialog.open(Config.message.ERROR, 0);
        });
    }
  }
}
