import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('user') && localStorage.getItem('token')){
      let confirm = window.confirm('¿Realmente quieres cerrar tu sesion?');

      if(confirm){
        return true;
      }else{
        return false;
      }
    }
    else{
      return false;
    }
  }
  
}
