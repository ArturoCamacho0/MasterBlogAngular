import { Component, OnInit, DoCheck } from '@angular/core';
import { global } from './services/global';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'MasterBlog';
  public identity;
  public token;
  public url;
  public user;

  constructor(
    private _userService: UserService
    ){
      this.loadUser();
      this.url = global.url+'user/';
      this.user = this._userService.getIdentity()
  }

  ngOnInit(){
    console.log('Bienvenido al Blog :)');
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
