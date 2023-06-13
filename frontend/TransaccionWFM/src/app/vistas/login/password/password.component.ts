import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder } from '@angular/forms'
import { Login } from 'src/app/modelos/login';
import { ServerService } from 'src/app/servicios/api/server.service';

import { MatDialog } from '@angular/material/dialog';
import { ProcesandoComponent } from 'src/app/vistas/procesando/procesando.component';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit{
  hide = true;
  formUsuario: any;
  user = <string | ''>localStorage.getItem('user');
  usuario: string;

  constructor(private router: Router, private fb: FormBuilder, private api:ServerService,
    public dialog: MatDialog, public snackBar: SnackbarService) {
    this.usuario = '';
    if (this.user.length > 0) {
      try {
        if (JSON.parse(this.user).id > 0) { } else {
          this.router.navigate(['']);
          return;
        }
      } catch (error) {
        this.router.navigate(['']);
        return;
      }
    }else{
      this.router.navigate(['']);
      return;
    }
    this.usuario = JSON.parse(this.user).nombreCompleto;
  }

  ngOnInit(): void {
    this.formUsuario = this.fb.group({
      usuario: new FormControl(JSON.parse(this.user).usuario, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(8)])
    });  
  };

  login(form: Login){
    var procesando = this.dialog.open(ProcesandoComponent,{disableClose:true});
    this.api.login(form).subscribe(data => {
      procesando.close();
      if (data.status.ok){
        try {
          if (JSON.parse(data.data).usuarioOK){
            // Usuario valido
            localStorage.setItem('user', JSON.stringify(JSON.parse(data.data).data[0].datosUsuario));
            this.router.navigate(['home']);
          }else{
            // Usuario no valido
            this.snackBar.openSnackBar(JSON.parse(data.data).mensaje, 'Aceptar');
          }
        } catch (error) {
          // Usuario no valido
          this.snackBar.openSnackBar(JSON.stringify(error), 'Aceptar');
        }
      }else{
        // Alerta de error en el servidor
        var mensaje = (data.status.mensaje.length > 0 ? data.status.mensaje : 'Error no identificado login de usuario!!!.');
        this.snackBar.openSnackBar(mensaje, 'Aceptar');
      };
    });
  };
}
