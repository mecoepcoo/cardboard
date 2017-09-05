import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ItemService } from '../share/item.service';
import { Item } from '../modal/item';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private _itemService: ItemService
  ) { }

  ngOnInit() {
    this.getItems();
    setTimeout(() => {
      console.log(this.itemList);
    }, 10000);
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
            this.itemList = datas.data;
          });
      });
  }

  addItem() {
    this._itemService.addItem(this.category.id, this.newItem)
      .subscribe((datas) => {
        console.log(datas);
        this.getItems();
      });
  }
}
