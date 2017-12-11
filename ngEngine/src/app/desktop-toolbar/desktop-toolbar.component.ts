import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../share/user.service';
import { MessageTipComponent } from '../message-tip/message-tip.component';
import { SelectCheckboxService } from '../share/select-checkbox.service';

@Component({
  selector: 'app-desktop-toolbar',
  templateUrl: './desktop-toolbar.component.html',
  styleUrls: ['./desktop-toolbar.css']
})
export class DesktopToolbarComponent implements OnInit {
  @ViewChild(MessageTipComponent) messageDialogComponent: MessageTipComponent;



  constructor(
    private _userService: UserService,
    private router: Router,
    private checkBoxService: SelectCheckboxService
  ) { }

  ngOnInit() {

  }

  doLogout() {
    return this._userService.doLogout()
      .subscribe(data => {
        this.router.navigate(['/login']);
      });
  }

  doRefresh() {
    location.reload();
  }

  // /* 批量删除分类 */
  // delCategories() {
  //   if (this.checkBoxService.selectedCheckBox.length === 0) {
  //     this.messageDialogComponent.messageDialog.open('请选择要删除的项目', 0);
  //   } else {
  //     this.confirmDialogComponent.confirmDialog.open('确定要删除' + this.checkBoxService.selectedCheckBox.length + '个分类吗？', this.checkBoxService.selectedCheckBox)
  //   }
  // }
  //
  // /* 删除单条分类记录 */
  // delCategory(event: any) {
  //   if (event instanceof Array) {
  //     for (const id of event) {
  //       for (const category of this.categories) {
  //         if (category.numb != 0 && id == category.id) {
  //           this.messageDialogComponent.messageDialog.open('有包含该分类的文章存在，不能删除', 0);
  //           return;
  //         }
  //       }
  //     }
  //   } else {
  //     for (let category of this.categories) {
  //       if (category.numb != 0 && event.id == category.id) {
  //         this.messageDialogComponent.messageDialog.open('有包含该分类的文章存在，不能删除', 0);
  //         return;
  //       }
  //     }
  //   }
  //   this.confirmDialogComponent.confirmDialog.processing();
  //   return this._categoryService.delCategory(event)
  //     .subscribe(data => {
  //       if (data.status == 1) {
  //         this.confirmDialogComponent.confirmDialog.close();
  //         this.confirmDialogComponent.confirmDialog.reset();
  //         if (event instanceof Array) {
  //           for (let i = 0; i < event.length; i++) {
  //             for (let j = 0; j < this.categories.length; j++) {
  //               if (event.indexOf(this.categories[j].id) > -1) {
  //                 this.categories.splice(j, 1);
  //               }
  //             }
  //           }
  //         } else {
  //           this.categories.forEach( (category, index) => {
  //             if (category.id == (<any>event).id) {
  //               this.categories.splice(index, 1);
  //             }
  //           });
  //         }
  //
  //         this.messageDialogComponent.messageDialog.open(data.message, 1);
  //       } else if (data.status == 0) {
  //         this.confirmDialogComponent.confirmDialog.retry();
  //         this.messageDialogComponent.messageDialog.open(data.message, 0);
  //       }
  //     }, error => {
  //       this.confirmDialogComponent.confirmDialog.retry();
  //       this.messageDialogComponent.messageDialog.open(`${Config.message.error}，请重试`, 0);
  //     });
  // }

}
