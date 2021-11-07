import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.scss'],
})
export class LogindialogComponent implements OnInit {
  user: User = { 
                 username:'',
                 password:'',
                 email:''
               } as User ;
  constructor(
    public dialogRef: MatDialogRef<LogindialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {}

  ngOnInit(): void {}
}
