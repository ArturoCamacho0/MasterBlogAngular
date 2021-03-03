import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryCreateComponent implements OnInit {
  public category: Category;
  public identity;
  public token;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1, '');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._categoryService.create(this.token, this.category).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
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
}
