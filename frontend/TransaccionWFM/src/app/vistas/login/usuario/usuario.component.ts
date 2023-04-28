import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder } from '@angular/forms'
import { ServerService } from 'src/app/servicios/api/server.service';
import { environment } from 'src/environments/environment';
import { Login } from 'src/app/modelos/login';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{
  formUsuario: any;
  ambiente = environment.ambiente;
  
  constructor(private api:ServerService, private router: Router, private fb: FormBuilder){
        
  }

  ngOnInit(): void {
    this.formUsuario = this.fb.group({
      usuario: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
    });  
  };

  validacionUsuario(form: Login){
    this.api.validarUsuario(form).subscribe(data => {
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
          }
        } catch (error) {
          // Usuario no valido
        }
      }else{
        // Alerta de error en el servidor
        var mensaje = (data.status.mensaje.length > 0 ? data.status.mensaje : 'Error no identificado login de usuario!!!.');
        alert(mensaje);
      };
    });
  }
}
