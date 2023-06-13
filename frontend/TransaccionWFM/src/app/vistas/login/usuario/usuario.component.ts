import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder } from '@angular/forms'
import { ServerService } from 'src/app/servicios/api/server.service';
import { environment } from 'src/environments/environment';
import { Login } from 'src/app/modelos/login';

import { MatDialog } from '@angular/material/dialog';
import { ProcesandoComponent } from 'src/app/vistas/procesando/procesando.component';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{
  formUsuario: any;
  ambiente = environment.ambiente;
  
  constructor(private api:ServerService, private router: Router, private fb: FormBuilder, 
    public dialog: MatDialog, public snackBar: SnackbarService){}
  
  ngOnInit(): void {
    this.formUsuario = this.fb.group({
      usuario: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
    });  
  };

  validacionUsuario(form: Login){
    var procesando = this.dialog.open(ProcesandoComponent,{disableClose:true});
    this.api.validarUsuario(form).subscribe(data => {
      procesando.close();
      if (data.status.ok){
        try {
          if (JSON.parse(data.data).usuarioOK){
            // Usuario valido
            localStorage.setItem('user', JSON.stringify(JSON.parse(data.data).data));
            if (JSON.parse(data.data).data.esNuevoPassword == 1){
              this.router.navigate(['/newpassword']);
            }else{
              this.router.navigate(['/password']);
            }
          }else{
            // Usuario no valido
            this.snackBar.openSnackBar('Usuario no existe!!!', 'Aceptar');
          }
        } catch (error) {
          // Usuario no valido
          this.snackBar.openSnackBar('Usuario no existe!!!', 'Aceptar');
        }
      }else{
        // Alerta de error en el servidor
        var mensaje = (data.status.mensaje.length > 0 ? data.status.mensaje : 'Error no identificado login de usuario!!!.');
        this.snackBar.openSnackBar(mensaje, 'Aceptar');
      };
    });
  }
}
