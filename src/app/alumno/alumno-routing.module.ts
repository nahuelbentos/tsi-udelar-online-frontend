import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { BuscarCursosComponent } from '../shared/pages/buscar-cursos/buscar-cursos.component';
import { NavAlumnoComponent } from './components/nav-alumno/nav-alumno.component';
import { CursosPublicosComponent } from './pages/cursos-publicos/cursos-publicos.component';
import { MisCursosComponent } from './pages/mis-cursos/mis-cursos.component';
import { VistaCursoComponent } from './pages/vista-curso/vista-curso.component';

const routes: Routes = [
  {
    path: '',
    component: NavAlumnoComponent,
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { role: 'alumno' },
    children: [
      {
        path: 'mis-cursos',
        component: MisCursosComponent,
        data: { titulo: 'Mis Cursos' },
      },
      {
        path: 'explorar-cursos',
        component: BuscarCursosComponent,
        data: { titulo: 'Explorar' },
      },
      {
        path: 'cursos-publicos',
        component: CursosPublicosComponent,
        data: { titulo: 'Todos los Cursos' },
      },
      {
        path: 'curso',
        component: VistaCursoComponent,
        data: { titulo: 'Ver Curso' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoRoutingModule {}
