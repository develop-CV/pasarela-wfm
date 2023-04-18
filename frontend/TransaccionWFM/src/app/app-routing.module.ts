import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VigilanteGuard } from "./utilidades/vigilante/vigilante.guard";
import { UsuarioComponent } from "./vistas/login/usuario/usuario.component";
import { PasswordComponent } from "./vistas/login/password/password.component";
import { TemaComponent } from "./vistas/tema/tema.component";
import { NotfoundComponent } from "./vistas/notfound/notfound.component";
import { MenuppalComponent } from "./vistas/menuppal/menuppal.component";
import { DashboardComponent } from "./vistas/menuppal/dashboard/dashboard.component";
import { UsuariosComponent } from "./vistas/usuarios/usuarios.component";

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
