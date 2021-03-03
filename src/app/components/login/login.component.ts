import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

import { Route, ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {
  public page_title:string;
  public user: User;
  public status: string;
  public token;
  public identity;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identificate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit(): void {
    // Se ejecuta siempre y cierra sesion solo cuando le llega le parametro sure por la url
    this.logout();
  }

  onSubmit(form){
    this._userService.signup(this.user).subscribe(
      response => {
        
        if(response.status != 'error'){
          this.status = 'success';
          this.token = response.user_token;

          this._userService.signup(this.user, true).subscribe(
            response => {
                this.status = 'success';
                this.identity = response.user;

                localStorage.setItem('token', this.token);
                localStorage.setItem('user', JSON.stringify(this.identity));
                this._router.navigate(['inicio']);
            },
            error => {
              console.log(error);
              this.status = 'fail';
              form.reset();

              setTimeout(() => {
                this.status = '';
              }, 4000);
              
            }
          );
        }else{
          this.status = 'fail';
          form.reset();

          setTimeout(() => {
            this.status = '';
          }, 4000);
        }
      },
      error => {
        console.log(error);
        this.status = 'fail';
        form.reset();

        setTimeout(() => {
          this.status = '';
        }, 4000);
      }
    );
  }

  logout(){
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if(logout == 1){
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        this._router.navigate(['inicio']);
      }
    });
  }

}
