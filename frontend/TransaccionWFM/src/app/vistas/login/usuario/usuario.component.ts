import { Component } from '@angular/core';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  ambiente = environment.ambiente;
}
