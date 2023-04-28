import { NgModule } from '@angular/core';
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

const routes: Routes = [
  {
    path:'',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: UsuarioComponent,
    pathMatch: 'full',
    canActivate: [VigilanteGuard]
  },
  {
    path:'newpassword',
    component: NewpasswordComponent,
    pathMatch: 'full',
    canActivate: [VigilanteGuard]
  },
  {
    path:'password',
    component: PasswordComponent,
    pathMatch: 'full',
    canActivate: [VigilanteGuard]
  },
  {
    path:'home',
    component: MenuppalComponent,
    canActivate: [VigilanteGuard],
    children: [
      {
        path:'',
        component: DashboardComponent,
        canActivate: [VigilanteGuard]
      },
      {
        path:'dashboard',
        component: DashboardComponent,
        canActivate: [VigilanteGuard]
      },
      {
        path:'usuarios',
        component: UsuariosComponent,
        canActivate: [VigilanteGuard]
      }
    ]
  },
  {
    path:'tema',
    component: TemaComponent,
    pathMatch: 'full',
    canActivate: [VigilanteGuard]
  },
  {
    path: '**',
    title: 'Pagina No Existe!!!',
    component: NotfoundComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
