import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from 'src/app/models/user';
import { global } from 'src/app/services/global';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, DoCheck {
  public user: User;
  public status: string;
  public emailTaken: boolean;
  public identity;
  public token;
  public resetVar = true;
  public url;
  public image;

  public froala_options: Object = {
    placeholderText: 'Introduce tu descripcion',
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI: {
      url:global.url+"user/upload",
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
    private _userService: UserService
    ){
      this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = global.url+'user/';

      this.user = new User(
        this.identity.id,
        this.identity.name,
        this.identity.surname,
        this.identity.role,
        this.identity.email,
        '',
        this.identity.description,
        this.identity.image
      );
    }

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  onSubmit(form){
    this.user.description = global.htmlEntities(this.user.description);
    
    this._userService.update(this.token, this.user).subscribe(
      response => {
        let res = JSON.parse(JSON.stringify(response));
        if(res.status == 'succes'){
          this.status = 'success';
          
          localStorage.setItem('user', JSON.stringify(res.user));
        }else{
          console.log('error');
        }
      },
      error => {
        this.status = 'fail';
        console.log(error);
      }
    );
  }

  avatarUpload(data){
    let image_name = data.body.image;
    this.user.image = image_name;
  }

}
