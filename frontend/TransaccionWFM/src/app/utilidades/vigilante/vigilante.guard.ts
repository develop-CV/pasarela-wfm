import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServerService } from 'src/app/servicios/api/server.service';

@Injectable({
  providedIn: 'root'
})
export class VigilanteGuard implements CanActivate {

  constructor(private router: Router, private api: ServerService) { }

  redirect(flag: boolean): any {
    if (!flag) {
      this.router.navigate(['login'])
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    var returnOK = false;
    var borrarToken = false;
    return new Promise<boolean>((resolver, rechazar) => {
      try {
        var user = <string>localStorage.getItem('user');
        var userToken = JSON.parse(user);
        if (userToken.token.length > 0) {
          this.api.validacionToken({ token: userToken.token }).subscribe((tokenOK) => {
            if (tokenOK) {
              resolver(true);
            } else {
              resolver(false);
            };
          },
            (error) => {
              resolver(false);
            });
        } else {
          resolver(false);
        };
      } catch (error) {
        resolver(false);
      };
    })
      .then((valorReturn) => {
        returnOK = valorReturn;
        if (returnOK) {
          if (route.component?.name == 'UsuarioComponent' || route.component?.name == 'PasswordComponent' || route.component?.name == 'NewpasswordComponent') {
            returnOK = false;
            borrarToken = false;
          }
        } else {
          borrarToken = true;
          if (route.component?.name == 'UsuarioComponent') {
            returnOK = true;
          }
          if (route.component?.name == 'NewpasswordComponent'){
            var user = <string>localStorage.getItem('user');
            if (user.length > 0) {
              try {
                if (JSON.parse(user).esNuevoPassword == true) {
                  returnOK = true;
                } else {
                  returnOK = false;
                }
              } catch (error) {
                returnOK = false;
              }
            } else {
              returnOK = false;
            }
          }
          if (route.component?.name == 'PasswordComponent') {
            var user = <string>localStorage.getItem('user');
            if (user.length > 0) {
              try {
                if (JSON.parse(user).id > 0) {
                  returnOK = true;
                } else {
                  returnOK = false;
                }
              } catch (error) {
                returnOK = false;
              }
            } else {
              returnOK = false;
            }
          }
        };

        if (returnOK === false) {
          if (borrarToken){
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
          }else{
            this.router.navigate(['/home']);
          };
        };
        return returnOK;
      })
      .catch((error) => {
        returnOK = false;
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
        return false;
      })
      .finally(() => {
        return returnOK;
      });

  }
}
