import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServerService } from 'src/app/servicios/api/server.service';
import { DatahijoService } from 'src/app/servicios/datahijo/datahijo.service';

import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NuevousuarioComponent } from 'src/app/vistas/nuevousuario/nuevousuario.component';
import { Tbusuarios } from 'src/app/modelos/tbusuarios';
import { ExcelService } from 'src/app/servicios/excel/excel.service';
import { ProcesandoComponent } from 'src/app/vistas/procesando/procesando.component';
import { MensajeComponent } from 'src/app/vistas/mensaje/mensaje.component';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  usuarios: any;
  dataSource: any;
  displayedColumns: string[] = ['tipoIdentificacion', 'identificacion', 'nombreCompleto', 'correo', 'perfil', 'opciones'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ServerService, private dataHijo: DatahijoService,
    private paginatorInt: MatPaginatorIntl, private dialog: MatDialog,
    private excelService: ExcelService, private snackBar: SnackbarService) {
    paginatorInt.nextPageLabel = "Siguiente";
    paginatorInt.previousPageLabel = "Anterior";
    paginatorInt.firstPageLabel = "Primera";
    paginatorInt.lastPageLabel = "Ultima";
    paginatorInt.itemsPerPageLabel = "Registros por Pagina";
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.dataHijo.dataHijo({ titulo: "Usuarios" });
    this.consumirUsuarios(0);
  }

  consumirUsuarios(idUsuario: any) {
    var procesando = this.dialog.open(ProcesandoComponent, { disableClose: true });
    this.api.consultarUsuarios(idUsuario).subscribe(data => {
      procesando.close();
      if (data.status.ok) {
        this.usuarios = JSON.parse(data.data);
        this.dataSource = new MatTableDataSource<Tbusuarios>(this.usuarios.filter(function (usuario: Tbusuarios) {
          return usuario.esEliminado == false
        }));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.snackBar.openSnackBar(data.status.mensaje, 'Aceptar');
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
  nuevoUsuario() {
    const dialogoCrearUsuario = this.dialog.open(NuevousuarioComponent, {
      disableClose: true, // No cerra el modal haciendo click por fuera o con escape
      data: {
        usuario: null
      }
    });

    dialogoCrearUsuario.afterClosed().subscribe(result => {
      if (result === true){
        this.consumirUsuarios(0); // Consultar los usuarios de nuevo en el servicio después de crear el nuevo
      }
    });
  }

  editarUsuario(usuario: Tbusuarios) {
    const dialogoEditarUsuario = this.dialog.open(NuevousuarioComponent, {
      disableClose: true, // No cerra el modal haciendo click por fuera o con escape
      data: {
        usuario: usuario
      }
    });
    dialogoEditarUsuario.afterClosed().subscribe(result => {
      if (result === true){
        this.consumirUsuarios(0); // Consultar los usuarios de nuevo en el servicio después de crear el nuevo
      }
    });
  }

  restaurarContrasena(usuario: Tbusuarios) {
    const dialogoMensaje = this.dialog.open(MensajeComponent, {
      disableClose: true,
      data: {
        titulo: 'Restaurar Contraseña',
        mensaje: 'Se restaurará la contraseña para el usuario ' + usuario.correo + '. Presione aceptar para continuar.',
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
        usuario.esNuevoPassword = true;
        var procesando = this.dialog.open(ProcesandoComponent, { disableClose: true });
        this.api.grabarUsuario(usuario).subscribe(data => {
          procesando.close();
          if (data.status.ok == true) {
            try {
              if (JSON.parse(data.data).ok == true) {
                this.snackBar.openSnackBar('Contraseña restaurada correctamente', 'Aceptar');
              }
            } catch (error) {

            }
          }
        });
      }
    });
  }

  borrarUsuario(usuario: Tbusuarios) {
    const dialogoMensaje = this.dialog.open(MensajeComponent, {
      disableClose: true,
      data: {
        titulo: 'Eliminar Usuario',
        mensaje: 'Se eliminará el usuario ' + usuario.correo + '. Esta acción no se puede deshacer. Presione aceptar para confirmar.',
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
        usuario.esEliminado = true;
        var procesando = this.dialog.open(ProcesandoComponent, { disableClose: true });
        this.api.grabarUsuario(usuario).subscribe(data => {
          if (data.status.ok) {
            this.snackBar.openSnackBar('Usuario eliminado correctamente', 'Aceptar');
          } else {
            this.snackBar.openSnackBar(data.status.mensaje, 'Aceptar');
          }
          procesando.close();
          this.consumirUsuarios(0); // Consultar los usuarios de nuevo en el servicio después de crear el nuevo
        });
      }
    });
  }

  exportarUsuarios() {
    this.excelService.exportAsExcelFile(this.usuarios, 'Usuarios');
  }
}
