import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { AbmEncuestaComponent } from '../shared/pages/abm-encuesta/abm-encuesta.component';
import { AbmMaterialComponent } from '../shared/pages/abm-material/abm-material.component';
import { GestionMaterialComponent } from '../shared/pages/gestion-material/gestion-material.component';
import { PerfilUsuarioComponent } from '../shared/pages/perfil-usuario/perfil-usuario.component';
import { NavDocenteComponent } from './components/nav-docente/nav-docente.component';
import { AdministrarCursosComponent } from './pages/administrar-cursos/administrar-cursos.component';
import { EncuestasComponent } from './pages/encuestas/encuestas.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { GestionAlumnocursoComponent } from '../shared/pages/gestion-alumnocurso/gestion-alumnocurso.component';
import { AbmPruebaonlineComponent } from '../shared/pages/abm-pruebaonline/abm-pruebaonline.component';
import { AbmAlumnocursoComponent } from '../shared/pages/abm-alumnocurso/abm-alumnocurso.component';
import { AdministrarCalificacionesComponent } from './pages/administrar-calificaciones/administrar-calificaciones.component';
import { GestionActividadComponent } from '../shared/pages/gestion-actividad/gestion-actividad.component';
import { AbmActividadComponent } from '../shared/pages/abm-actividad/abm-actividad.component';
import { GestionPruebaonlineComponent } from '../shared/pages/gestion-pruebaonline/gestion-pruebaonline.component';
import { VerForoComponent } from '../shared/ver-foro/ver-foro.component';
import { AbmTemaForoComponent } from '../shared/pages/abm-temaforo/abm-temaforo.component';
import { AbmCursoComponent } from '../shared/pages/abm-curso/abm-curso.component';
import { AdministrarPruebasOnlineComponent } from './pages/administrar-pruebas-online/administrar-pruebas-online.component';
import { GestionCalsesDictadasComponent } from '../shared/pages/gestion-calses-dictadas/gestion-calses-dictadas.component';
import { SalaChatComponent } from '../shared/pages/sala-chat/sala-chat.component';
import { HomeComponent } from '../docente/pages/home/home.component';
import { CalendarioActividadesComponent } from './pages/calendario-actividades/calendario-actividades.component';
import { GestionForoComponent } from '../shared/pages/gestion-foro/gestion-foro.component';
import { AbmForoComponent } from '../shared/pages/abm-foro/abm-foro.component';
import { VerTemaForoComponent } from '../shared/pages/ver-tema-foro/ver-tema-foro.component';


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
        component: AdministrarCursosComponent,
        data: { titulo: 'Administrar Cursos' },
      },
      {
        path: 'curso/abm-curso',
        component: AbmCursoComponent,
        data: { titulo: 'Editar Curso' },
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
        path: 'administrar-calificaciones/abm-alumnocurso',
        component: AbmAlumnocursoComponent,
        data: { titulo: 'Modificar calificación' },
      },
      {
        path: 'administrar-calificaciones',
        component: AdministrarCalificacionesComponent,
        data: { titulo: 'Administrar calificaciones' },
      },
      {
        path: 'estudiantes',
        component: EstudiantesComponent,
        data: { titulo: 'Estudiantes' },
      },
      {
        path: 'encuestas',
        component: EncuestasComponent,
        data: { titulo: 'Encuestas' },
      },
      {
        path: 'encuestas/abm-encuesta',
        component: AbmEncuestaComponent,
        data: { titulo: 'ABM de Encuestas' },
      },
      {
        path: 'administrar-entregas',
        component: GestionActividadComponent,
        data: { titulo: 'Administrar entregas' },
      },

      {
        path: 'administrar-entregas/abm-actividad',
        component: AbmActividadComponent,
        data: { titulo: 'ABM de entregas' },
      },
      {
        path: 'abm-material',
        component: AbmMaterialComponent,
        data: { titulo: 'ABM de materiales' },
      },
      {
        path: 'ver-tema-foro',
        component: VerTemaForoComponent,
        data: { titulo: 'Ver Tema Foro' },
      },
      {
        path: 'administrar-foros',
        component: GestionForoComponent,
        data: { titulo: 'Administrar Foros' },
      },
      {
        path: 'administrar-foros/abm-foro',
        component: AbmForoComponent,
        data: { titulo: 'ABM Foros' },
      },
      {
        path: 'administrar-foros/ver-foro',
        component: VerForoComponent,
        data: { titulo: 'Ver Foro' },
      },
      {
        path: 'abm-temaForo',
        component: AbmTemaForoComponent,
        data: { titulo: 'Añadir un nuevo tema de debate' },
      },

      {
        path: 'administrar-clasesdictadas',
        component: GestionCalsesDictadasComponent,
        data: { titulo: 'Administrar Clases Dictadas' },
      },

      {
        path: 'administrar-clasesdictadas/abm-clasedictada',
        component: AbmActividadComponent,
        data: { titulo: 'Clase Dictada' },
      },
      {
        path: 'calendario',
        component: CalendarioActividadesComponent,
        data: { titulo: 'Calendario de Actividades' },
      },
      {
        path: 'chat',
        component: SalaChatComponent,
        data: { titulo: 'Chat' },
      },
      {
        path: 'informes',
        component: HomeComponent,
        data: { titulo: 'Informes' },
      }, 
      {
        path: 'administrar-notas-curso-pruebasonline',
        component: AdministrarPruebasOnlineComponent,
        data: { titulo: 'Manejo de notas de cursos y evaluaciones' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocenteRoutingModule { }
