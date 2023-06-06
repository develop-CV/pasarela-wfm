import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Returnserver } from 'src/app/modelos/returnserver';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
//import { ProcesandoComponent } from 'src/app/vistas/procesando/procesando.component';
import { Login } from 'src/app/modelos/login';
import { Newpassword } from 'src/app/modelos/newpassword';
import { Tbusuarios } from 'src/app/modelos/tbusuarios';

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
    //this.dialog.closeAll();
    return this.http.post<Returnserver>(direccion, form);
  };

  login(form:Login):Observable<Returnserver>{
    console.log('API login()');
    let direccion = this.url + 'api/login/login/';
    //this.dialog.open(ProcesandoComponent,{disableClose:true});
    //this.dialog.closeAll();
    return this.http.post<Returnserver>(direccion, form);
  };

  validacionToken(token:object):Observable<boolean>{
    console.log('API validaciontoken()');
    let direccion = this.url + 'api/login/validaciontoken/';
    //this.dialog.open(ProcesandoComponent,{disableClose:true});
    //this.dialog.closeAll();
    return this.http.post<boolean>(direccion, token);
  };

  newPassword(form:Newpassword):Observable<Returnserver>{
    console.log('API newPassword()');
    let direccion = this.url + 'api/login/newpwd/';
    //this.dialog.open(ProcesandoComponent,{disableClose:true});
    //this.dialog.closeAll();
    return this.http.post<Returnserver>(direccion, form);
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
    
  };

  consultarTiposIdentifaciones(idTipoIdentificacion:bigint):Observable<Returnserver>{
    console.log('API consultarTiposIdentifaciones()');
    let direccion = this.url + 'api/maestros/tiposidentificacion/';
    //this.dialog.open(ProcesandoComponent,{disableClose:true});
    //this.dialog.closeAll();
    return this.http.post<Returnserver>(direccion, {
      idTipoIdentificacion: idTipoIdentificacion,
      token: JSON.parse(<string>localStorage.getItem('user')).token
    });
    
  };

  grabarUsuario(dataUsuario:Tbusuarios):Observable<Returnserver>{
    console.log('API grabarUsuario()');
    let direccion = this.url + 'api/maestros/grabarusuario/';
    //this.dialog.open(ProcesandoComponent,{disableClose:true});
    //this.dialog.closeAll();
    return this.http.post<Returnserver>(direccion, {
      datosUsuario: dataUsuario,
      token: JSON.parse(<string>localStorage.getItem('user')).token
    });
    
  };
}
