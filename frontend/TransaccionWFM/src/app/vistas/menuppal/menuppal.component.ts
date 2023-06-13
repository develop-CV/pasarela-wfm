import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatahijoService } from 'src/app/servicios/datahijo/datahijo.service';

@Component({
  selector: 'app-menuppal',
  templateUrl: './menuppal.component.html',
  styleUrls: ['./menuppal.component.css']
})
export class MenuppalComponent implements OnInit{
  submenuExpanded:string='I';
  titulo:string='';
  usuario:any;

  constructor(private router: Router, private dataHijo: DatahijoService){
    this.usuario = JSON.parse(<string>localStorage.getItem('user'));
  }

  ngOnInit(){
    this.dataHijo.changeEmitted.subscribe(data => {
      var datos = JSON.stringify(data);
      this.titulo = JSON.parse(datos).titulo;
    });
  }

  toggleSubmenu(submenu:string) {
    if (this.submenuExpanded === submenu && submenu !== 'I'){
      this.submenuExpanded = '';
    }else{
      this.submenuExpanded = submenu;
    }
  }

  cerrarSesion(){
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
}
