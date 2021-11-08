import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, UserService } from 'src/app/shared/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterdialogComponent } from '../registerdialog/registerdialog.component';
import { ForgotdialogComponent } from '../forgotdialog/forgotdialog.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.scss'],
})
export class LogindialogComponent implements OnInit {
  user: User = {
    username: '',
    password: '',
    email: ''
  } as User;
  constructor(
    private toastr: ToastrService,
    public dialog: MatDialog,
    private userService: UserService,
    public dialogRef: MatDialogRef<LogindialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) { }

  ngOnInit(): void { }
  
  openRegisterDialog() {
    console.log('dialogOpened!');
    const dialogRef = this.dialog.open(RegisterdialogComponent,
      { 
        disableClose: true,
        height: '70vh'
        
      });

    dialogRef.afterClosed().subscribe((user: User) => {
      if (user === undefined) {
        return;
      }
      if (user.password !== user.password_confirm) {
        this.toastr.error('Password mismatch','Please enter same password for both fields!')
        this.openRegisterDialog();
      }
      if (user.username === '' || user.password === '' || user.email === '' || user.password_confirm === '') {
        this.openRegisterDialog();
        this.toastr.error('Invalid Request','Please do not leave credentials empty');
        return;
      }
      console.log('user',user);
      this.userService.register(user).subscribe(
        (data) => {
          this.toastr.success('Success','User registered successfully!');
          console.log('afterRegister',data);
        },
        (error) => { 
          this.toastr.error('Invalid Request','Register Failed!');
          this.openRegisterDialog();
        }
      );

    });
  }
  openForgotDialog(){
    console.log('dialogOpened!');
    const dialogRef = this.dialog.open(ForgotdialogComponent,
      { 
        disableClose: true,
      
     
      });

    dialogRef.afterClosed().subscribe((user: User) => {
      if (user === undefined) {
        return;
      }
      if ( user.email === '' ) {
        this.openForgotDialog();
        this.toastr.error('Invalid Request','Please do not leave email empty');
        return;
      }
      console.log('user',user);
      this.userService.forgot(user).subscribe(
        (data) => {
          this.toastr.success('Success','Link sent successfully! Check your email!');
          console.log('afterRegister',data);
        },
        (error) => { 
          this.toastr.error('Invalid request','Failed to send mail!');
          this.openForgotDialog();
        }
      );

    });
  }
  testRegex(entry) {
    let regexp = new RegExp('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}');
    return regexp.test(entry);
  }
}
