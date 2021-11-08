import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-forgotdialog',
  templateUrl: './forgotdialog.component.html',
  styleUrls: ['./forgotdialog.component.scss']
})
export class ForgotdialogComponent implements OnInit {
  user: User = {
    email: ''
  } as User;
  constructor() { }

  ngOnInit(): void {
  }
  testRegex(entry) {
    let regexp = new RegExp('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}');
    return regexp.test(entry);
  }
}
