import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  user: User = {
    token: '',
    password: '',
    password_confirm: '',
  } as User;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    console.log('ngOnInit() ResetComponent');
    this.user.token = this.route.snapshot.paramMap.get('token');
    console.log(this.user.password,this.user.password_confirm);
  }
  onProceedResetPassword(user) {
    console.log('proceedReset', user);
    if(user.password === '' && user.password_confirm === '') {
      this.toastr.error('Empty input fields','Please enter same password for both fields!')
      return;
    }
    if(user.password !== user.password_confirm) {
      this.toastr.error('Password mismatch','Please enter same password for both fields!')
      return;
    }
    this.userService.reset(user).subscribe(
      (data) => {
        console.log('reset', data);
        this.toastr.success('Success','Password reset successfully!')
      },
      (error) => this.toastr.error('Error','Password could not be reset!')
    );
    this.router.navigate(['/']);
  }
}
