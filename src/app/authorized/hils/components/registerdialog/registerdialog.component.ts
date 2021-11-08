import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-registerdialog',
  templateUrl: './registerdialog.component.html',
  styleUrls: ['./registerdialog.component.scss']
})
export class RegisterdialogComponent implements OnInit {
  user: User = { 
    username:'',
    password:'',
    password_confirm: '',
    email:'',
  } as User ;
  constructor() { }

  ngOnInit(): void {
  }
  testRegex(entry) {
    let regexp = new RegExp('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}');
    return regexp.test(entry);
  }
}
