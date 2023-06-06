import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {TextFieldModule} from '@angular/cdk/text-field';



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
import { NewpasswordComponent } from './vistas/login/newpassword/newpassword.component';
import { ProcesandoComponent } from './vistas/procesando/procesando.component';
import { DatahijoService } from 'src/app/servicios/datahijo/datahijo.service';
import { NuevousuarioComponent } from './vistas/nuevousuario/nuevousuario.component';


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
  MatSortModule,
  MatCardModule,
  MatGridListModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatDialogModule,
  MatSelectModule,
  TextFieldModule
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
    UsuariosComponent,
    NewpasswordComponent,
    ProcesandoComponent,
    NuevousuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    angularMaterial
  ],
  providers: [
    DatahijoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
