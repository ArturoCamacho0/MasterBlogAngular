import { Component, OnInit } from '@angular/core';
import { global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { PostService } from '../../services/post.service';
import { Route, ActivatedRoute, Params, Router} from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService, CategoryService]
})
export class PostDetailComponent implements OnInit {
  public post;
  public status: string;
  public statusNumber: string;
  public token;
  public identity;
  public url;
  public numberPostsCategory;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;

    this.getPost();
  }

  ngOnInit(): void {
  }

  getPost(){
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._postService.getOne(id, this.token).subscribe(
        response => {
          let res = JSON.parse(JSON.stringify(response));
          if(res.status = 'success'){
            this.post = res.post;
            this.getNumberOfPostsCategories(this.post.category_id);

            this.status = 'success';
          }else{
            this.status = 'fail';
          }
        },
        error => {
          this.status = 'fail';
        }
      );
    });
  }

  getTime(post_time){
    return new Date(post_time).getDay() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
  }

  getNumberOfPostsCategories(id_category){
    this._postService.getPostByCategory(id_category).subscribe(
      response => {
        let res = JSON.parse(JSON.stringify(response));
        if(res.status == 'success'){
          this.numberPostsCategory = res.posts.length;
          this.statusNumber = 'successNumber';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
