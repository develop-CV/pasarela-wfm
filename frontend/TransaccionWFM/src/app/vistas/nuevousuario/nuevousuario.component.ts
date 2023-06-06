import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormBuilder } from '@angular/forms'
import { ServerService } from 'src/app/servicios/api/server.service';
import { Tbusuarios } from 'src/app/modelos/tbusuarios';

import { MatDialog } from '@angular/material/dialog';
import { ProcesandoComponent } from 'src/app/vistas/procesando/procesando.component';

@Component({
  selector: 'app-nuevousuario',
  templateUrl: './nuevousuario.component.html',
  styleUrls: ['./nuevousuario.component.css']
})
export class NuevousuarioComponent implements OnInit {
  formUsuario: any;
  tiposIdentificaciones: any;
  esUsuarioModificacion:boolean = (this.data.usuario ? (this.data.usuario.id > 0 ? true : false) : false);
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
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any){
    }

  ngOnInit(): void {
    this.formUsuario = this.fb.group({
      id: new FormControl(this.usuario.id),
      idTipoIdentificacion: new FormControl({value: this.usuario.idTipoIdentificacion, disabled: this.esUsuarioModificacion}, [Validators.required]),
      identificacion: new FormControl({value: this.usuario.identificacion, disabled: this.esUsuarioModificacion}, [Validators.required]),
      nombreCompleto: new FormControl(this.usuario.nombreCompleto, [Validators.required]),
      correo: new FormControl({value: this.usuario.correo, disabled: this.esUsuarioModificacion}, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      perfil: new FormControl(this.usuario.perfil, [Validators.required]),
      esActivo: new FormControl({value: this.usuario.esActivo, disabled: !this.esUsuarioModificacion}, [Validators.required]),
      esNuevoPassword: new FormControl(this.usuario.esNuevoPassword, [Validators.required]),
      esEliminado: new FormControl(this.usuario.esEliminado, [Validators.required])
    });
    
    var idTiposIdentifaciones:any = 0;
    var procesando = this.dialog.open(ProcesandoComponent,{disableClose:true});
    this.api.consultarTiposIdentifaciones(idTiposIdentifaciones).subscribe(data => {
      procesando.close();
      if (data.status.ok){
        this.tiposIdentificaciones = JSON.parse(data.data);
      };
    });
  };

  cancelar(){
    this.dialogRef.close();
  }

  crearUsuario(form:Tbusuarios){
    var procesando = this.dialog.open(ProcesandoComponent,{disableClose:true});
    this.api.grabarUsuario(form).subscribe(data => {
      procesando.close();
      if (data.status.ok){
        this.dialogRef.close();
      }else{
        alert(data.status.mensaje);
      };
    })
  }

}
