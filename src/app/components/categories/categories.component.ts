import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoryService, PostService]
})
export class CategoriesComponent implements OnInit {
  public categories;
  public status;
  public statusNumber;
  public numberPostsCategory;

  constructor(
    private _categoryService: CategoryService,
    private _postService: PostService
  ){
    this.getCategories();
  }

  ngOnInit(): void {
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        this.categories = response.categories;
        this.status = 'success';
      },
      error => {
        console.log(error);
      }
    );
  }
}
