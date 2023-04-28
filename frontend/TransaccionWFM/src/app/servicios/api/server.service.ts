import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Returnserver } from 'src/app/modelos/returnserver';
import { environment } from 'src/environments/environment';
import { Login } from 'src/app/modelos/login';
import { Newpassword } from 'src/app/modelos/newpassword';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  url:string = environment.apiServer.url + ':' + environment.apiServer.puerto.toString() + '/';

  constructor(private http:HttpClient) {}
  
  validarUsuario(form:Login):Observable<Returnserver>{
    console.log('API validarUsuario()');
    let direccion = this.url + 'api/login/user/';
    return this.http.post<Returnserver>(direccion, form);
  };

  login(form:Login):Observable<Returnserver>{
    console.log('API login()');
    let direccion = this.url + 'api/login/login/';
    return this.http.post<Returnserver>(direccion, form);
  };

  validacionToken(token:object):Observable<boolean>{
    console.log('API validaciontoken()');
    let direccion = this.url + 'api/login/validaciontoken/';
    return this.http.post<boolean>(direccion, token);
  };

  newPassword(form:Newpassword):Observable<Returnserver>{
    console.log('API newPassword()');
    let direccion = this.url + 'api/login/newpwd/';
    return this.http.post<Returnserver>(direccion, form);
  };
}
