import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService, UserService]
})
export class HomeComponent implements OnInit {
  public posts;
  public status: string;
  public token;
  public identity;
  public url;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
    this.getPosts();
  }

  ngOnInit(): void {
  }

  getPosts(){
    if(this.token != null){
      this._postService.getAll(this.token).subscribe(
        response => {
          let res = JSON.parse(JSON.stringify(response));
          if(res.status = 'success'){
            this.status = 'success';
            
            this.posts = res.posts;
            console.log(this.posts);
          }else{
            this.status = 'fail';
          }
          
        },
        error => {
          console.log(error);
        }
      );
    }else{
      this.status = '404';
      
    }
  }

  getTimeAgo(post_time){
    return global.timeDifference(new Date().getTime(), new Date(post_time).getTime());
  }

  getTime(post_time){
    return new Date(post_time).getDay() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
  }

  deletePost(id){
    this._postService.delete(id, this.token).subscribe(
      response => {
        this.getPosts();
      },
      error => {
        console.log(error);
        alert('No se ha podido eliminar');
      }
    );
  }

}

