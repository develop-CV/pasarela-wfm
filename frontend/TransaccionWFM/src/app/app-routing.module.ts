import { NgModule } from '@angular/core';
import { environment } from "src/environments/environment";
import { RouterModule, Routes } from '@angular/router';
import { VigilanteGuard } from "src/app/utilidades/vigilante/vigilante.guard";
import { UsuarioComponent } from "src/app/vistas/login/usuario/usuario.component";
import { PasswordComponent } from "src/app/vistas/login/password/password.component";
import { TemaComponent } from "src/app/vistas/tema/tema.component";
import { NotfoundComponent } from "src/app/vistas/notfound/notfound.component";
import { MenuppalComponent } from "src/app/vistas/menuppal/menuppal.component";
import { DashboardComponent } from "src/app/vistas/menuppal/dashboard/dashboard.component";
import { UsuariosComponent } from "src/app/vistas/usuarios/usuarios.component";
import { NewpasswordComponent } from 'src/app/vistas/login/newpassword/newpassword.component';
import { FrecuenciacargaComponent } from 'src/app/vistas/frecuenciacarga/frecuenciacarga.component';
import { CargaplantaComponent } from './vistas/cargaplanta/cargaplanta.component';
import { ConsultaplantaComponent } from './vistas/consultaplanta/consultaplanta.component';

const titulo = (environment.production ? '' : environment.ambiente);

const routes: Routes = [
  {
    path:'',
    redirectTo: '/login',
    pathMatch: 'full',
    title: 'TransaccionWFM-Login ' + titulo
  },
  {
    path:'login',
    component: UsuarioComponent,
    pathMatch: 'full',
    canActivate: [VigilanteGuard],
    title: 'TransaccionWFM-Login ' + titulo
  },
  {
    path:'newpassword',
    component: NewpasswordComponent,
    pathMatch: 'full',
    canActivate: [VigilanteGuard],
    title: 'TransaccionWFM-Nuevo Password ' + titulo
  },
  {
    path:'password',
    component: PasswordComponent,
    pathMatch: 'full',
    canActivate: [VigilanteGuard],
    title: 'TransaccionWFM-Login ' + titulo
  },
  {
    path:'home',
    component: MenuppalComponent,
    canActivate: [VigilanteGuard],
    children: [
      {
        path:'',
        component: DashboardComponent,
        canActivate: [VigilanteGuard],
        title: 'TransaccionWFM-Inicio ' + titulo
      },
      {
        path:'dashboard',
        component: DashboardComponent,
        canActivate: [VigilanteGuard],
        title: 'TransaccionWFM-Inicio ' + titulo
      },
      {
        path:'usuarios',
        component: UsuariosComponent,
        canActivate: [VigilanteGuard],
        title: 'TransaccionWFM-Usuarios ' + titulo
      },
      {
        path:'frecuenciacarga',
        component: FrecuenciacargaComponent,
        canActivate: [VigilanteGuard],
        title: 'TransaccionWFM-Frecuencia Carga ' + titulo
      },
      {
        path:'cargaplanta',
        component: CargaplantaComponent,
        canActivate: [VigilanteGuard],
        title: 'TransaccionWFM-Carga Planta ' + titulo
      },
      {
        path:'consultaplanta',
        component: ConsultaplantaComponent,
        canActivate: [VigilanteGuard],
        title: 'TransaccionWFM-Consulta Planta ' + titulo
      }
    ]
  },
  {
    path:'tema',
    component: TemaComponent,
    pathMatch: 'full',
    canActivate: [VigilanteGuard],
    title: 'TransaccionWFM-Temas ' + titulo
  },
  {
    path: '**',
    component: NotfoundComponent,
    pathMatch: 'full',
    title: 'TransaccionWFM-Pagina no existe!!! ' + titulo
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
