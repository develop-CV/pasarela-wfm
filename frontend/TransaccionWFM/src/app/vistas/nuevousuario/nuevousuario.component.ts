import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormBuilder } from '@angular/forms'
import { ServerService } from 'src/app/servicios/api/server.service';
import { Tbusuarios } from 'src/app/modelos/tbusuarios';

@Component({
  selector: 'app-nuevousuario',
  templateUrl: './nuevousuario.component.html',
  styleUrls: ['./nuevousuario.component.css']
})
export class NuevousuarioComponent implements OnInit {
  formUsuario: any;
  tiposIdentificaciones: any;
  usuario: Tbusuarios = {
    id: (this.data.usuario ? this.data.usuario.id : null),
    idTipoIdentificacion: (this.data.usuario ? this.data.usuario.idTipoIdentificacion : null),
    identificacion: (this.data.usuario ? this.data.usuario.identificacion : ''),
    nombreCompleto: (this.data.usuario ? this.data.usuario.nombreCompleto : ''),
    correo: (this.data.usuario ? this.data.usuario.correo : ''),
    perfil: (this.data.usuario ? this.data.usuario.perfil : 'G'),
    esActivo: (this.data.usuario ? this.data.usuario.esActivo : true),
    esNuevoPassword: (this.data.usuario ? this.data.usuario.esNuevoPassword : false),
    esEliminado: (this.data.usuario ? this.data.usuario.esEliminado : false)
  };

  constructor(private dialogRef : MatDialogRef<NuevousuarioComponent>,
    private api:ServerService, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any){
    }

  ngOnInit(): void {
    alert(JSON.stringify(this.usuario));
    this.formUsuario = this.fb.group({
      id: new FormControl(this.usuario.id),
      idTipoIdentificacion: new FormControl(this.usuario.idTipoIdentificacion, [Validators.required]),
      identificacion: new FormControl(this.usuario.identificacion, [Validators.required]),
      nombreCompleto: new FormControl(this.usuario.nombreCompleto, [Validators.required]),
      correo: new FormControl(this.usuario.correo, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      perfil: new FormControl(this.usuario.perfil, [Validators.required]),
      esActivo: new FormControl(this.usuario.esActivo, [Validators.required]),
      esNuevoPassword: new FormControl(this.usuario.esNuevoPassword, [Validators.required]),
      esEliminado: new FormControl(this.usuario.esEliminado, [Validators.required])
    });
    
    var idTiposIdentifaciones:any = 0;
    this.api.consultarTiposIdentifaciones(idTiposIdentifaciones).subscribe(data => {
      if (data.status.ok){
        this.tiposIdentificaciones = JSON.parse(data.data);
      };
    });
  };

  cancelar(){
    alert(JSON.stringify(this.data));
    this.dialogRef.close();
  }

  crearUsuario(form:Tbusuarios){
    this.api.grabarUsuario(form).subscribe(data => {
      if (data.status.ok){
        this.dialogRef.close();
      };
    })
  }

}
