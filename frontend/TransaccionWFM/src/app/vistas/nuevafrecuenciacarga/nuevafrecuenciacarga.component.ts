import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormBuilder } from '@angular/forms'
import { ServerService } from 'src/app/servicios/api/server.service';
import { Tbservicioshorarios } from 'src/app/modelos/tbservicioshorarios';

import { MatDialog } from '@angular/material/dialog';
import { ProcesandoComponent } from 'src/app/vistas/procesando/procesando.component';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';


@Component({
  selector: 'app-nuevafrecuenciacarga',
  templateUrl: './nuevafrecuenciacarga.component.html',
  styleUrls: ['./nuevafrecuenciacarga.component.css']
})
export class NuevafrecuenciacargaComponent implements OnInit {
  formServiciosHorarios: any;
  servicios: any;
  servicioHorario: Tbservicioshorarios = {
    id: (this.data.servicioHorario ? this.data.servicioHorario.id : null),
    idServicio: (this.data.servicioHorario ? this.data.servicioHorario.idServicio : null),
    hora: (this.data.servicioHorario ? this.data.servicioHorario.hora : ''),
    esActivo: (this.data.servicioHorario ? this.data.servicioHorario.esActivo : true)
  };

  constructor(private dialogRef : MatDialogRef<NuevafrecuenciacargaComponent>,
    private api:ServerService, private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, public snackBar: SnackbarService){
    }

  ngOnInit(): void {
    this.formServiciosHorarios = this.fb.group({
      id: new FormControl(this.servicioHorario.id),
      idServicio: new FormControl(this.servicioHorario.idServicio, [Validators.required]),
      hora: new FormControl(this.servicioHorario.hora, [Validators.required]),
      esActivo: new FormControl(this.servicioHorario.esActivo, [Validators.required])
    });
    
    var idServicio:any = 0;
    var procesando = this.dialog.open(ProcesandoComponent,{disableClose:true});
    this.api.consultarServicios(idServicio).subscribe(data => {
      procesando.close();
      if (data.status.ok){
        this.servicios = JSON.parse(data.data);
      };
    });
  };

  cancelar(){
    this.dialogRef.close(false);
  }

  crearFrecuenciaCarga(form:Tbservicioshorarios){
    var procesando = this.dialog.open(ProcesandoComponent,{disableClose:true});
    this.api.grabarFrecuenciaCarga(form).subscribe(data => {
      procesando.close();
      if (data.status.ok){
        this.snackBar.openSnackBar('Frecuencia Carga grabada correctamente', 'Aceptar');
        this.dialogRef.close(true);
      }else{
        this.snackBar.openSnackBar(data.status.mensaje, 'Aceptar');
      };
    })
  }
}
