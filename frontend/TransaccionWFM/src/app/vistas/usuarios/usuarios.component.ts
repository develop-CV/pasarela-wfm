import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServerService } from 'src/app/servicios/api/server.service';
import { DatahijoService } from 'src/app/servicios/datahijo/datahijo.service';

import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

export interface PeriodicElement {
  id: bigint;
  idTipoIdentificacion: bigint;
  identificacion: number;
  nombreCompleto: string;
  correo: string;
  perfil: string;
  esActivo: boolean;
  esNuevoPassword: boolean;
  esEliminado: boolean;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  dataSource:any;
  displayedColumns:string[]=['identificacion', 'nombreCompleto', 'correo', 'perfil', 'esActivo', 'opciones'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ServerService, private dataHijo: DatahijoService, private paginatorInt: MatPaginatorIntl){
    paginatorInt.nextPageLabel = "Siguiente";
    paginatorInt.previousPageLabel = "Anterior";
    paginatorInt.firstPageLabel = "Primera";
    paginatorInt.lastPageLabel = "Ultima";
    paginatorInt.itemsPerPageLabel = "Registros por Pagina";
  }

  ngOnInit(){
    console.log('ngOnInit');
    this.dataHijo.dataHijo({titulo:"Usuarios"});
    let idUsuario:any;
    idUsuario = 0;
    this.api.consultarUsuarios(idUsuario).subscribe(data => {
      if (data.status.ok){
        this.dataSource = new MatTableDataSource<PeriodicElement>(JSON.parse(data.data));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
