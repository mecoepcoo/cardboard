import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../share/user.service';
import { MessageTipComponent } from '../message-tip/message-tip.component';
import { SelectCheckboxService } from '../share/select-checkbox.service';
import { CategoryService } from '../share/category.service';

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
    private checkBoxService: SelectCheckboxService,
    private categoryService: CategoryService
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
}
