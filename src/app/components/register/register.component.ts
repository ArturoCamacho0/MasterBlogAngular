import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ UserService ]
})
export class RegisterComponent implements OnInit {
  public user: User;
  public status: string;
  public emailTaken: boolean;

  constructor(
    private _userService: UserService
  ){
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._userService.register(this.user).subscribe(
      response => {
        if(response.status == 'succes'){
          this.status = 'success';
        }else{
          this.status = 'fail';
          setTimeout(() => {
            this.status = '';
          }, 5000);
        }

        form.reset();
      },
      error => {
        this.status = 'fail';
        
        if(error.error.errors.email){
          this.emailTaken = true;
          this.user.email = '';
          setTimeout(() => {
            this.emailTaken = false;
          }, 5000);
        }

        setTimeout(() => {
          this.status = '';
        }, 5000);
      }
    );
  }
}
