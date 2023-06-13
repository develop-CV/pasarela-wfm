import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from 'src/app/servicios/api/server.service';
import { DatahijoService } from 'src/app/servicios/datahijo/datahijo.service';
import { MatDialog } from '@angular/material/dialog';
import { ProcesandoComponent } from 'src/app/vistas/procesando/procesando.component';
import { Tbservicioshorarios } from 'src/app/modelos/tbservicioshorarios';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ExcelService } from 'src/app/servicios/excel/excel.service';
import { NuevafrecuenciacargaComponent } from '../nuevafrecuenciacarga/nuevafrecuenciacarga.component';
import { MensajeComponent } from '../mensaje/mensaje.component';

@Component({
  selector: 'app-frecuenciacarga',
  templateUrl: './frecuenciacarga.component.html',
  styleUrls: ['./frecuenciacarga.component.css']
})
export class FrecuenciacargaComponent implements OnInit {
  frecuenciasCargas: any;
  dataSource: any;
  displayedColumns: string[] = ['nombreServicio', 'hora', 'esActivo', 'opciones'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;


  constructor(private api: ServerService, private dataHijo: DatahijoService,
    private dialog: MatDialog, private snackBar: SnackbarService,
    private paginatorInt: MatPaginatorIntl, private excelService: ExcelService) {
    paginatorInt.nextPageLabel = "Siguiente";
    paginatorInt.previousPageLabel = "Anterior";
    paginatorInt.firstPageLabel = "Primera";
    paginatorInt.lastPageLabel = "Ultima";
    paginatorInt.itemsPerPageLabel = "Registros por Pagina";
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.dataHijo.dataHijo({ titulo: "Configuración Frecuencia Carga" });
    this.consumirFrecuenciaCarga(0);
  };

  consumirFrecuenciaCarga(idFrecuenciaCarga: any) {
    var procesando = this.dialog.open(ProcesandoComponent, { disableClose: true });
    this.api.consultarFrecuenciaCarga(idFrecuenciaCarga).subscribe(data => {
      procesando.close();
      if (data.status.ok) {
        this.frecuenciasCargas = JSON.parse(data.data);
        this.dataSource = new MatTableDataSource<Tbservicioshorarios>(this.frecuenciasCargas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.snackBar.openSnackBar(data.status.mensaje, 'Aceptar');
      }
    });
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };

  exportarFrecuenciaCarga() {
    this.excelService.exportAsExcelFile(this.frecuenciasCargas, 'Frecuencia Carga');
  }

  // Abrir modal de Nueva Frecuencia Carga.
  nuevaFrecuenciaCarga() {
    const dialogoFrecuenciaCarga = this.dialog.open(NuevafrecuenciacargaComponent, {
      disableClose: true, // No cerra el modal haciendo click por fuera o con escape
      data: {
        servicioHorario: null
      }
    });

    dialogoFrecuenciaCarga.afterClosed().subscribe(result => {
      if (result === true) {
        this.consumirFrecuenciaCarga(0); // Consultar las frecuencias de carga de nuevo en el servicio después de crear el nuevo
      }
    });
  }

  editarFrecuenciaCarga(servicioHorario: Tbservicioshorarios) {
    const dialogoEditarFrecuenciaCarga = this.dialog.open(NuevafrecuenciacargaComponent, {
      disableClose: true, // No cerra el modal haciendo click por fuera o con escape
      data: {
        servicioHorario: servicioHorario
      }
    });
    dialogoEditarFrecuenciaCarga.afterClosed().subscribe(result => {
      if (result === true) {
        this.consumirFrecuenciaCarga(0); // Consultar los usuarios de nuevo en el servicio después de crear el nuevo
      }
    });
  }

  eliminarFrecuenciaCarga(servicioHorario: Tbservicioshorarios) {
    const dialogoMensaje = this.dialog.open(MensajeComponent, {
      disableClose: true,
      data: {
        titulo: 'Eliminar Usuario',
        mensaje: 'Se eliminará la configuración de frecuencia. Esta acción no se puede deshacer. Presione aceptar para confirmar.',
        opciones: [
          {
            value: false,
            texto: 'Cancelar'
          },
          {
            value: true,
            texto: 'Aceptar',
            color: 'primary'
          }
        ]
      }
    });
    dialogoMensaje.afterClosed().subscribe(result => {
      if (result === true) {
        servicioHorario.accion = 'D';
        var procesando = this.dialog.open(ProcesandoComponent, { disableClose: true });
        this.api.grabarFrecuenciaCarga(servicioHorario).subscribe(data => {
          procesando.close();
          if (data.status.ok) {
            this.consumirFrecuenciaCarga(0); // Consultar los usuarios de nuevo en el servicio después de crear el nuevo
            this.snackBar.openSnackBar('Frecuencia Carga eliminada correctamente', 'Aceptar');
          } else {
            this.snackBar.openSnackBar(data.status.mensaje, 'Aceptar');
          };
        })
      }
    });
  }
}
