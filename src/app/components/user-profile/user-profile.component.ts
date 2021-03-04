import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from 'src/app/models/user';
import { global } from 'src/app/services/global';
import { PostService } from 'src/app/services/post.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [UserService, PostService]
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
  public posts;

  constructor(
    private _userService: UserService,
    private _postService: PostService
  ){
    this.user = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url+'user/';
    this.getPosts();
  }

  ngOnInit(): void {
  }

  getPosts(){
    this._postService.getPostByUser(this.user.id).subscribe(
      response => {
        let res = JSON.parse(JSON.stringify(response));
        if(res.status == 'success'){
          this.posts = res.posts;
          this.status = 'success';
          if(this.posts.length < 1){
            this.status = '404';
          }
        }else{
          this.status = 'fail';
        }
        
      },
      error => {
        console.log(error);
        this.status = 'fail';
      }
    );
  }

  getTime(post_time){
    return new Date(post_time).getDay() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
  }

}
