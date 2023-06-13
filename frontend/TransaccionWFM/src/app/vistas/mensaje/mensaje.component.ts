import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mensaje } from 'src/app/modelos/mensaje';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent {
  constructor(private dialogRef: MatDialogRef<MensajeComponent>, @Inject(MAT_DIALOG_DATA) public data: Mensaje){
  }

  eventoClick(opcion:any){
    if (opcion.ejecutar){
      opcion.ejecutar();
    };

    this.dialogRef.close(opcion.value);
  };
  
}
