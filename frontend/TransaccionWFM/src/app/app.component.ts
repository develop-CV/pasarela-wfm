import { Component } from '@angular/core';
import { environment } from "./../environments/environment";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TransaccionWFM' + (environment.production ? '' : ' ' + environment.ambiente);
  
  constructor(private titulo:Title){
    titulo.setTitle(this.title);
  }
}
