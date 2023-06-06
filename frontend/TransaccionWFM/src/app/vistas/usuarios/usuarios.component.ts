import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServerService } from 'src/app/servicios/api/server.service';
import { DatahijoService } from 'src/app/servicios/datahijo/datahijo.service';

import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { NuevousuarioComponent } from '../nuevousuario/nuevousuario.component';
import { Tbusuarios } from 'src/app/modelos/tbusuarios';
import { ExcelService } from 'src/app/servicios/excel/excel.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  usuarios:any;
  dataSource:any;
  displayedColumns:string[]=['identificacion', 'nombreCompleto', 'correo', 'perfil', 'esActivo', 'opciones'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ServerService, private dataHijo: DatahijoService,
      private paginatorInt: MatPaginatorIntl, private dialog: MatDialog,
      private excelService: ExcelService){
    paginatorInt.nextPageLabel = "Siguiente";
    paginatorInt.previousPageLabel = "Anterior";
    paginatorInt.firstPageLabel = "Primera";
    paginatorInt.lastPageLabel = "Ultima";
    paginatorInt.itemsPerPageLabel = "Registros por Pagina";
  }

  ngOnInit(){
    console.log('ngOnInit');
    this.dataHijo.dataHijo({titulo:"Usuarios"});
    this.consumirUsuarios(0);
  }

  consumirUsuarios(idUsuario:any){
    this.api.consultarUsuarios(idUsuario).subscribe(data => {
      if (data.status.ok){
        this.usuarios = JSON.parse(data.data);
        this.dataSource = new MatTableDataSource<Tbusuarios>(this.usuarios.filter(function(usuario:Tbusuarios){
          return usuario.esEliminado == false
        }));
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

  // Abrir modal de Nuevo Usuario.
  nuevoUsuario(){
    const dialogoCrearUsuario = this.dialog.open(NuevousuarioComponent, {
      disableClose:true, // No cerra el modal haciendo click por fuera o con escape
      data:{
        usuario: null
      }
    });

    dialogoCrearUsuario.afterClosed().subscribe(result => {
      this.consumirUsuarios(0); // Consultar los usuarios de nuevo en el servicio después de crear el nuevo
    });
  }

  editarUsuario(usuario:Tbusuarios){
    const dialogoEditarUsuario = this.dialog.open(NuevousuarioComponent, {
      disableClose:true, // No cerra el modal haciendo click por fuera o con escape
      data:{
        usuario: usuario
      }
    });

    dialogoEditarUsuario.afterClosed().subscribe(result => {
      this.consumirUsuarios(0); // Consultar los usuarios de nuevo en el servicio después de crear el nuevo
    });
  }

  restaurarContrasena(usuario:Tbusuarios){
    usuario.esNuevoPassword = true;
    this.api.grabarUsuario(usuario).subscribe(data => {
    });
  }

  borrarUsuario(usuario:Tbusuarios){
    usuario.esEliminado = true;
    this.api.grabarUsuario(usuario).subscribe(data => {
      this.consumirUsuarios(0); // Consultar los usuarios de nuevo en el servicio después de crear el nuevo
    });
  }

  exportarUsuarios(){
    this.excelService.exportAsExcelFile(this.usuarios, 'Usuarios');
  }
}
