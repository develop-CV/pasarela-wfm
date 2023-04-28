import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Newpassword } from 'src/app/modelos/newpassword';
import { ServerService } from 'src/app/servicios/api/server.service';
import { validaciones } from "src/app/utilidades/validaciones";

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit{
  hide = true;
  hideConfirma = true;
  formNewPassword: any;
  user = <string | ''>localStorage.getItem('user');
  usuario: string;
  
  constructor(private fb:FormBuilder, private router:Router, private api:ServerService){
    this.usuario = '';
    if (this.user.length > 0) {
      try {
        // Validar que se tenga un usuario
        if (JSON.parse(this.user).id > 0) { } else {
          this.router.navigate(['']);
          return;
        }
        // Validar que tenga configurado nuevo password
        if (JSON.parse(this.user).esNuevoPassword == true) { } else {
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
  };

  ngOnInit(): void {
    this.formNewPassword = this.fb.group({
      usuario: new FormControl(JSON.parse(this.user).usuario, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(8)]),
      contrasenaConfirma: new FormControl('', [Validators.required, Validators.minLength(8), validaciones.esIgual('contrasena')])
    });
  };

  guardarPassword(form:Newpassword){
    this.api.newPassword(form).subscribe(data => {
      if (data.status.ok){
        try {
          if (data.data.usuarioOK){
            // Usuario valido
            localStorage.setItem('user', JSON.stringify(data.data.data));
            this.router.navigate(['home']);
          }else{
            // Usuario no valido
            alert(data.data.mensaje);
            this.router.navigate(['']);
          }
        } catch (error) {
          // Usuario no valido
          alert(error);
          this.router.navigate(['']);
        }
      }else{
        // Alerta de error en el servidor
        var mensaje = (data.status.mensaje.length > 0 ? data.status.mensaje : 'Error no identificado login de usuario!!!.');
        alert(mensaje);
        this.router.navigate(['']);
      };
    });
  }

  mensajeHasError(control: string){
    if(this.formNewPassword.get(control).errors && this.formNewPassword.get(control).touched){
      try {
        if (this.formNewPassword.get(control).hasError('required')){
          return 'El campo es requerido';
        }
      } catch (error) {
      }

      try {
        if (this.formNewPassword.get(control).hasError('minlength')){
          return 'La contraseña debe superar los 8 caracteres';
        }
      } catch (error) {
      }

      try {
        if (this.formNewPassword.get(control).errors.esIgual !== null){
          return 'Las contraseñas no considen';
        }
      } catch (error) {
      }
    }
    return null;
  };
}
