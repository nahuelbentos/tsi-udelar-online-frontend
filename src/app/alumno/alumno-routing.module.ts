import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { BuscarCursosComponent } from '../shared/pages/buscar-cursos/buscar-cursos.component';
import { NavAlumnoComponent } from './components/nav-alumno/nav-alumno.component';
import { CursosPublicosComponent } from './pages/cursos-publicos/cursos-publicos.component';
import { MisCursosComponent } from './pages/mis-cursos/mis-cursos.component';
import { ResponderEncuestaComponent } from './pages/responder-encuesta/responder-encuesta.component';
import { VistaCursoComponent } from './pages/vista-curso/vista-curso.component';
import { SubirLaboratorioComponent } from './pages/subir-laboratorio/subir-laboratorio.component';
import { VerForoComponent } from '../shared/ver-foro/ver-foro.component';
import { AbmTemaForoComponent } from '../shared/pages/abm-temaforo/abm-temaforo.component';

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
      {
        path: 'subir-laboratorio',
        component: SubirLaboratorioComponent,
        data: { titulo: 'Subir Laboratorio' },
      },
      {
        path: 'responder-encuesta',
        component: ResponderEncuestaComponent,
        data: { titulo: 'Responder Encuesta' },
      },
      {
        path: 'ver-foro',
        component: VerForoComponent,
        data: { titulo: 'Ver Foro' },
      },
      {
        path: 'abm-temaForo',
        component: AbmTemaForoComponent,
        data: { titulo: 'Añadir un nuevo tema de debate' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoRoutingModule {}
