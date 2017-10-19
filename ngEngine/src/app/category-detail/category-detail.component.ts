import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ItemService } from '../share/item.service';
import { Item } from '../model/item';
import { CategoryService } from '../share/category.service';
import { MessageTipComponent } from '../message-tip/message-tip.component';
import { Config } from '../share/config';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: [
    '../share/style/detail.css',
    './category-detail.css'
  ]
})
export class CategoryDetailComponent implements OnInit, AfterViewInit {
  @ViewChild(MessageTipComponent) messageDialogComponent: MessageTipComponent;

  category: any = {
    id: '',
    name: '',
    unit: ''
  };

  editFlag = {
    status: false,
    text: '解锁编辑'
  };

  itemList: Item[] = [];

  newItem = {
    name: '',
    brand: '',
    model: '',
    standard: '',
    color: '',
    price: '',
    date: new Date().getTime(),
    remark: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private _itemService: ItemService,
    private _categoryService: CategoryService,
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.getItems();
  }

  // 控制是否允许编辑
  setEditFlag() {
    this.editFlag.status = !this.editFlag.status;
    if (this.editFlag.status) {
      this.editFlag.text = '锁定编辑';
    } else {
      this.editFlag.text = '解锁编辑';
    }
  }

  // 获取项目信息
  getItems() {
    this.activatedRoute.params
      .subscribe((param) => {
        this.category.id = param.id;
        this._itemService.getItemList(this.category.id)
          .subscribe(datas => {
            datas.data.forEach((data, index) => {
              data.changed = false;
            });
            this.itemList = datas.data;
          });
        this._categoryService.getCategory(this.category.id)
          .subscribe(datas => {
            this.category = datas.data;
          });
      });
  }

  // 添加项目
  addItem($event) {
    const newItem = this.newItem;
    if (newItem.name && newItem.price) {
      this._itemService.addItem(this.category.id, newItem)
        .subscribe((datas) => {
          this.getItems();
          console.log($event.path[2].children);
          const eles = $event.path[2].children;
          this.newItem.name = '';
          this.newItem.brand = '';
          this.newItem.model = '';
          this.newItem.standard = '';
          this.newItem.color = '';
          this.newItem.price = '';
          this.newItem.remark = '';
          for (let i = 0; i < eles.length; i++) {
            if (i !== 0 && i !== 7 && i !== 9) {
              eles[i].innerText = '';
            }
          }
          this.messageDialogComponent.messageDialog.open(Config.message.SUCCESS, 1);
        }, error => {
          this.messageDialogComponent.messageDialog.open(Config.message.ERROR, 0);
        });
    } else {
      this.messageDialogComponent.messageDialog.open('请将名称与价格填写完整', 0);
    }
  }

  // 保存修改过的项目
  saveItem(item) {
    if (item.changed) {
      item.date = new Date().getTime();
      this._itemService.saveItem(item)
        .subscribe(datas => {
          this.messageDialogComponent.messageDialog.open(Config.message.SUCCESS, 1);
          this.getItems();
        }, error => {
          this.messageDialogComponent.messageDialog.open(Config.message.ERROR, 0);
        });
    }
  }

  // 删除项目，设定为双击按钮删除
  deleteItem(itemId) {
    this._itemService.deleteItem(itemId)
      .subscribe(datas => {
        this.messageDialogComponent.messageDialog.open(Config.message.SUCCESS, 1);
        this.getItems();
      }, error => {
        this.messageDialogComponent.messageDialog.open(Config.message.ERROR, 0);
      });
  }

  saveUnit($event) {
    if (!$event.target.innerText) {
      $event.target.innerText = '个';
    }
    this._categoryService.saveCategory({
      id: this.category.id,
      unit: $event.target.innerText
    })
      .subscribe();
  }
}
