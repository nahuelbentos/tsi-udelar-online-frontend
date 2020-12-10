import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { ZoomComponent } from './shared/components/zoom/zoom.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./public/public.module').then((m) => m.PublicModule),
      },
   
      {
        path: 'administrador',
        loadChildren: () =>
          import('./administrador/administrador.module').then(
            (m) => m.AdministradorModule
          ),
      },
      {
        path: 'administrador-facultad',
        loadChildren: () =>
          import('./administrador-facultad/administrador-facultad.module').then(
            (m) => m.AdministradorFacultadModule
          ),
      },
      {
        path: 'alumno',
        loadChildren: () =>
          import('./alumno/alumno.module').then((m) => m.AlumnoModule),
      },
      {
        path: 'docente',
        loadChildren: () =>
          import('./docente/docente.module').then((m) => m.DocenteModule),
      },
      {
        path: 'zoom',
        component: ZoomComponent

      },
    ],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./error/error.module').then((m) => m.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
