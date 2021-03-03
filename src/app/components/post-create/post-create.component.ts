import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  providers: [UserService, CategoryService, PostService ]
})
export class PostCreateComponent implements OnInit {
  public post: Post;
  public identity;
  public token;
  public categories: Array<any> = [];
  public url;
  public resetVar = true;
  public status: string;

  public options: Object = {
    placeholderText: 'Escribe algo asombroso...',
    charCounterCount: true,
    language: 'es',
  };

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI: {
      url:global.url+"post/upload",
      method:"POST",
      headers: {
        "Authorization" : this._userService.getToken()
      },
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Eliminar',
      uploadBtn: 'Subir',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu avatar',
      afterUploadMsg_success: 'La imagen se ha subido!',
      afterUploadMsg_error: 'Ha ocurrido un error al subir la imagen',
      sizeLimit: 'Tamaño maximo'
    }
  };

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.post = new Post(1, '', '' , '', '', this.identity.id, 1);
    this.url = global.url;

    this.getCategories();
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this.post.content = global.htmlEntities(this.post.content);

    this._postService.create(this.token, this.post).subscribe(
      response => {
        let res = JSON.parse(JSON.stringify(response));

        if(res.status == "success"){
          this.status = 'success';
        }else{
          this.status = 'fail';
        }
        console.log(response);
      },
      error => {
        this.status = 'fail';
        console.log(error);
      }
    );
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        this.categories = response.categories;
      },
      error => {
        console.log(error);
      }
    );
  }

  avatarUpload(data){
    let image_name = data.body.image;
    this.post.image = image_name;
  }

}
