import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/servicios/excel/excel.service';
import { ServerService } from 'src/app/servicios/api/server.service';
import { DatahijoService } from 'src/app/servicios/datahijo/datahijo.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProcesandoComponent } from '../procesando/procesando.component';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';

@Component({
  selector: 'app-cargaplanta',
  templateUrl: './cargaplanta.component.html',
  styleUrls: ['./cargaplanta.component.css']
})
export class CargaplantaComponent implements OnInit {
  formDocumento: any;
  fileName: any;
  datosExport: any;
  
  constructor(private excel: ExcelService, private api: ServerService, private dataHijo: DatahijoService,
    private fb: FormBuilder, private dialog: MatDialog, private snackBar: SnackbarService ) { }

  ngOnInit() {
    console.log('ngOnInit');
    this.dataHijo.dataHijo({ titulo: "Cargar Planta Actualizada" });

    this.formDocumento = this.fb.group({
      outline: new FormControl(undefined, [Validators.required])
    });
  }

  onFileChange(event: any) {
    var procesando = this.dialog.open(ProcesandoComponent, { disableClose: true });
    this.excel.exportAsJSON(event).then((datosCargaPlanta) => {
      procesando.close();
      if (typeof datosCargaPlanta == 'object' && datosCargaPlanta != null) {
        const file: File = event.target.files[0];
        if (file) {
          this.fileName = file.name;
          this.datosExport = datosCargaPlanta;
        }
      }
    });
  }

  cargarArchivo() {
    var procesando = this.dialog.open(ProcesandoComponent, { disableClose: true });
    this.api.grabarCargaPlanta(this.datosExport).subscribe((data) => {
      procesando.close();
      if (data.status.ok == true && data.data[0].ok == true){
        this.borrarArchivo();
        this.snackBar.openSnackBar('Archivo cargado correctamente.', 'Aceptar');
      }else{
        if (data.status.ok == false){
          this.snackBar.openSnackBar(data.status.mensaje, 'Aceptar');
        }else{
          if (data.data[0].ok == false){
            this.snackBar.openSnackBar(data.data[0].mensaje, 'Aceptar');
          }
        }
      }
    });
  }

  borrarArchivo(){
    this.datosExport = null;
    this.fileName = '';
  }
}
