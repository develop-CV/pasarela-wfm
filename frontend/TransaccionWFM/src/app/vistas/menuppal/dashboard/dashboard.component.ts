import { Component, OnInit } from '@angular/core';
import { DatahijoService } from 'src/app/servicios/datahijo/datahijo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private dataHijo: DatahijoService){
  }

  ngOnInit(){
    this.dataHijo.dataHijo({titulo:"Inicio"});
  }
}
