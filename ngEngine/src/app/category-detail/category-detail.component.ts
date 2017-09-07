import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ItemService } from '../share/item.service';
import { Item } from '../modal/item';
import { CategoryService } from '../share/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: [
    '../share/style/detail.css',
    './category-detail.css'
  ]
})
export class CategoryDetailComponent implements OnInit {
  category = {
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

  constructor(private activatedRoute: ActivatedRoute,
              private _itemService: ItemService,
              private _categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getItems();
  }

  setEditFlag() {
    this.editFlag.status = !this.editFlag.status;
    if (this.editFlag.status) {
      this.editFlag.text = '锁定编辑';
    } else {
      this.editFlag.text = '解锁编辑';
    }
  }

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

  addItem() {
    const newItem = this.newItem;
    if (newItem.name && newItem.price) {
      this._itemService.addItem(this.category.id, newItem)
        .subscribe((datas) => {
          console.log(datas);
          this.getItems();
        });
    } else {
      console.log('error');
    }
  }

  saveItem(item) {
    console.log(item);
    if (item.changed) {
      item.date = new Date().getTime();
      this._itemService.saveItem(item)
        .subscribe((datas) => {
          console.log(datas);
          this.getItems();
        });
    }
  }

  saveUnit($event) {
    console.log($event.target.innerText)
    if (!$event.target.innerText) {
      this.category.unit = '个';
    }
    this._categoryService.saveCategory({
      id: this.category.id,
      unit: $event.target.innerText
    })
      .subscribe(() => {
        this._categoryService.getCategory(this.category.id)
          .subscribe(datas => {
            this.category = datas.data;
          });
      });
  }
}
