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
import { CalendarioComponent } from '../shared/components/calendario/calendario.component';
import { VerForoComponent } from '../shared/ver-foro/ver-foro.component';
import { AbmTemaForoComponent } from '../shared/pages/abm-temaforo/abm-temaforo.component';
import { ZoomComponent } from '../shared/components/zoom/zoom.component';
import { PerfilUsuarioComponent } from '../shared/pages/perfil-usuario/perfil-usuario.component';
import { SalaChatComponent } from '../shared/pages/sala-chat/sala-chat.component';
import { EvaluacionIndividualComponent } from './pages/evaluacion-individual/evaluacion-individual.component';

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
        path: 'vista-calendario',
        component: CalendarioComponent,
        data: { titulo: 'Calendario' },
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
      {
        path: 'vista-zoom',
        component: ZoomComponent,
        data: { titulo: 'Zoom' },
      },
      {
        path: 'perfil',
        component: PerfilUsuarioComponent,
        data: { titulo: 'Perfil' },
      },
      {
        path: 'chat',
        component: SalaChatComponent,
        data: { titulo: 'Chat' },
      },
      {
        path: 'evaluacion-individual',
        component: EvaluacionIndividualComponent,
        data: { titulo: 'Evaluación individual' },
      },
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoRoutingModule {}
