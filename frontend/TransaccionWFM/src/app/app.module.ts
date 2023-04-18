import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Importar los materiales a angular.
import {MatButtonModule} from '@angular/material/button'; // Botones
import {MatIconModule} from '@angular/material/icon'; // Iconos
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemaComponent } from './vistas/tema/tema.component';
import { UsuarioComponent } from './vistas/login/usuario/usuario.component';
import { PasswordComponent } from './vistas/login/password/password.component';
import { NotfoundComponent } from './vistas/notfound/notfound.component';
import { MenuppalComponent } from './vistas/menuppal/menuppal.component';
import { DashboardComponent } from './vistas/menuppal/dashboard/dashboard.component';
import { UsuariosComponent } from './vistas/usuarios/usuarios.component';

const angularMaterial = [
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatInputModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatSortModule
];

@NgModule({
  declarations: [
    AppComponent,
    TemaComponent,
    UsuarioComponent,
    PasswordComponent,
    NotfoundComponent,
    MenuppalComponent,
    DashboardComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    angularMaterial
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
