/* 淡入淡出提示框组件 */
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-message-tip',
  templateUrl: './message-tip.component.html',
  styleUrls: ['./message-tip.css']
})
export class MessageTipComponent implements OnInit {
  @ViewChild('myMessageDialog') myMessageDialog;

  messageDialogClass = {
    'message-success': false,
    'message-error': false,
  };

  messageDialog = {
    display: false,
    text: 'hello',
    setText: (text) => {
      this.messageDialog.text = text;
    },
    setClass: (status) => {
      status === 1 ? this.messageDialogClass['message-success'] = true : this.messageDialogClass['message-error'] = true;
    },
    open: (text, status) => {
      this.messageDialog.setText(text);
      this.messageDialog.setClass(status);
      this.messageDialog.display = true;
      this.myMessageDialog.nativeElement.style = 'opacity: 0;filter: alpha(opacity=0);';
      setTimeout(() => {
        this.myMessageDialog.nativeElement.style = 'opacity: 0.8;filter: alpha(opacity=80);';
      }, 10);
      setTimeout(() => {
        this.messageDialog.close();
      }, 2000);
    },
    close: () => {
      this.myMessageDialog.nativeElement.style = 'opacity: 0;filter: alpha(opacity=0);';
      setTimeout(() => {
        this.messageDialogClass['message-success'] = false;
        this.messageDialogClass['message-error'] = false;
        this.messageDialog.display = false;
      }, 1000);
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
