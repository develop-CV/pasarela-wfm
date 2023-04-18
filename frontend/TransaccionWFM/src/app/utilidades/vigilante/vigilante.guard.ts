import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VigilanteGuard implements CanActivate {

  constructor(private router: Router) { }

  redirect(flag: boolean): any {
    if (!flag) {
      this.router.navigate(['login'])
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(state);
    if (route.component?.name == 'UsuarioComponent' || route.component?.name == 'PasswordComponent'){
      console.log('Login');
      return true;
    }else{
      console.log('No Login');
      return false;
    }
      
  }
  
}
