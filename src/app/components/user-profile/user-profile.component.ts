import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from 'src/app/models/user';
import { global } from 'src/app/services/global';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user: User;
  public status: string;
  public emailTaken: boolean;
  public identity;
  public token;
  public resetVar = true;
  public url;
  public image;

  constructor(
    private _userService: UserService
  ){
    this.user = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url+'user/';
  }

  ngOnInit(): void {
  }

}
