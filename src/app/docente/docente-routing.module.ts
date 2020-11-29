import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { AbmRespuestaComponent } from '../shared/pages/abm-respuesta/abm-respuesta.component';
import { AbmTemaForoComponent } from '../shared/pages/abm-temaforo/abm-temaforo.component';
import { GestionCursoComponent } from '../shared/pages/gestion-curso/gestion-curso.component';
import { PerfilUsuarioComponent } from '../shared/pages/perfil-usuario/perfil-usuario.component';
import { GestionPruebaonlineComponent } from '../shared/pages/gestion-pruebaonline/gestion-pruebaonline.component';
import { NavDocenteComponent } from './components/nav-docente/nav-docente.component';
import { GestionAlumnocursoComponent } from '../shared/pages/gestion-alumnocurso/gestion-alumnocurso.component';
import { AbmPruebaonlineComponent } from '../shared/pages/abm-pruebaonline/abm-pruebaonline.component';
import { AbmAlumnocursoComponent } from '../shared/pages/abm-alumnocurso/abm-alumnocurso.component';


const routes: Routes = [
  {
    path: '',
    component: NavDocenteComponent,
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { role: 'docente' },
    children: [
      {
        path: 'curso',
        component: GestionCursoComponent,
        data: { titulo: 'Gestión de Cursos' },
      },
      {
        path: 'perfil',
        component: PerfilUsuarioComponent,
        data: { titulo: 'Perfil de Usuario' },
      },
      {
        path: 'pruebaonline',
        component: GestionPruebaonlineComponent,
        data: { titulo: 'Prueba Online' },
      },
      {
        path: 'pruebaonline/abm-pruebaonline',
        component: AbmPruebaonlineComponent,
        data: { titulo: 'Abm Prueba Online' },
      },
      {
        path: 'alumnocurso',
        component: GestionAlumnocursoComponent,
        data: { titulo: 'Alumno Curso' },
      },
      {
        path: 'alumnocurso/abm-alumnocurso',
        component: AbmAlumnocursoComponent,
        data: { titulo: 'Abm Alumno Curso' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocenteRoutingModule { }
