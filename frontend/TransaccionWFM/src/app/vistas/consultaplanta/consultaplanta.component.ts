import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServerService } from 'src/app/servicios/api/server.service';
import { DatahijoService } from 'src/app/servicios/datahijo/datahijo.service';
import { ProcesandoComponent } from '../procesando/procesando.component';
import { MatTableDataSource } from '@angular/material/table';
import { Tbcargasplanta } from 'src/app/modelos/tbcargasplanta';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ExcelService } from 'src/app/servicios/excel/excel.service';

@Component({
  selector: 'app-consultaplanta',
  templateUrl: './consultaplanta.component.html',
  styleUrls: ['./consultaplanta.component.css']
})
export class ConsultaplantaComponent implements OnInit {
  datosPlanta:any;
  dataSource:any;
  displayedColumns: string[] = ['codigo', 'nombres', 'fechaInicioVigencia', 'nombreEstablecimiento', 'nombreUnidadTrabajo', 'contrato'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataHijo: DatahijoService, private api: ServerService, private dialog: MatDialog,
    private snackBar: SnackbarService, private excelService: ExcelService, private paginatorInt: MatPaginatorIntl){
      paginatorInt.nextPageLabel = "Siguiente";
      paginatorInt.previousPageLabel = "Anterior";
      paginatorInt.firstPageLabel = "Primera";
      paginatorInt.lastPageLabel = "Ultima";
      paginatorInt.itemsPerPageLabel = "Registros por Pagina";
    }
  ngOnInit() {
    console.log('ngOnInit');
    this.dataHijo.dataHijo({ titulo: "Consulta Planta SARA" });

    var procesando = this.dialog.open(ProcesandoComponent, { disableClose: true });
    this.api.consultarCargaPlanta().subscribe(data => {
      procesando.close();
      if (data.status.ok) {
        this.datosPlanta = data.data;
        this.datosPlanta = JSON.parse(JSON.stringify(this.datosPlanta).replaceAll('\\t', ' ')); /* Se reemplaza los caracteres que presentan problema al momento de importar la información */
        this.dataSource = new MatTableDataSource<Tbcargasplanta>(this.datosPlanta);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.snackBar.openSnackBar(data.status.mensaje, 'Aceptar');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportarDatos() {
    this.excelService.exportAsExcelFile(this.datosPlanta, 'Planta SARA');
  }
}
