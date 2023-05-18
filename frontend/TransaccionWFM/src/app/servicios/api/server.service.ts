import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Returnserver } from 'src/app/modelos/returnserver';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ProcesandoComponent } from 'src/app/vistas/procesando/procesando.component';
import { Login } from 'src/app/modelos/login';
import { Newpassword } from 'src/app/modelos/newpassword';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  url:string = environment.apiServer.url + ':' + environment.apiServer.puerto.toString() + '/';

  constructor(private http:HttpClient, public dialog: MatDialog) {}
  
  validarUsuario(form:Login):Observable<Returnserver>{
    console.log('API validarUsuario()');
    let direccion = this.url + 'api/login/user/';
    //this.dialog.open(ProcesandoComponent,{disableClose:true});
    let dataRetornar = this.http.post<Returnserver>(direccion, form);
    //this.dialog.closeAll();
    return dataRetornar;
  };

  login(form:Login):Observable<Returnserver>{
    console.log('API login()');
    let direccion = this.url + 'api/login/login/';
    //this.dialog.open(ProcesandoComponent,{disableClose:true});
    let dataRetornar = this.http.post<Returnserver>(direccion, form);
    //this.dialog.closeAll();
    return dataRetornar;
  };

  validacionToken(token:object):Observable<boolean>{
    console.log('API validaciontoken()');
    let direccion = this.url + 'api/login/validaciontoken/';
    //this.dialog.open(ProcesandoComponent,{disableClose:true});
    let dataRetornar = this.http.post<boolean>(direccion, token);
    //this.dialog.closeAll();
    return dataRetornar;
  };

  newPassword(form:Newpassword):Observable<Returnserver>{
    console.log('API newPassword()');
    let direccion = this.url + 'api/login/newpwd/';
    //this.dialog.open(ProcesandoComponent,{disableClose:true});
    let dataRetornar = this.http.post<Returnserver>(direccion, form);
    //this.dialog.closeAll();
    return dataRetornar;
  };

  consultarUsuarios(idUsuario:bigint):Observable<Returnserver>{
    console.log('API consultarUsuarios()');
    let direccion = this.url + 'api/maestros/usuarios/';
    //this.dialog.open(ProcesandoComponent,{disableClose:true});
    //this.dialog.closeAll();
    return this.http.post<Returnserver>(direccion, {
      idUsuario: idUsuario,
      token: JSON.parse(<string>localStorage.getItem('user')).token
    });
    
  }
}
