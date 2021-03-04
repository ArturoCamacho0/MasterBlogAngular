import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';
import { Route, ActivatedRoute, Params, Router} from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-posts-by-category',
  templateUrl: './posts-by-category.component.html',
  styleUrls: ['./posts-by-category.component.css'],
  providers: [PostService, UserService, CategoryService]
})
export class PostsByCategoryComponent implements OnInit {
  public token;
  public identity;
  public posts;
  public status;
  public url;
  public title;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._postService.getPostByCategory(id).subscribe(
        response => {
          let res = JSON.parse(JSON.stringify(response));
          if(res.status == 'success'){
            this.posts = res.posts;
            
            for(let post of this.posts){
              this.title = post.category.name;
              break;
            }
            
            this.status = 'ok';
            console.log(response)

            if(res.posts.length == 0){
              this.status = 'no';
            }
          }else{
            this.status = 'no';
          }
        },
        error => {
          this.status = 'no';
        }
      );
    });
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
