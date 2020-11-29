import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { AbmEncuestaComponent } from '../shared/pages/abm-encuesta/abm-encuesta.component';
import { PerfilUsuarioComponent } from '../shared/pages/perfil-usuario/perfil-usuario.component';
import { GestionPruebaonlineComponent } from '../shared/pages/gestion-pruebaonline/gestion-pruebaonline.component';
import { NavDocenteComponent } from './components/nav-docente/nav-docente.component';
import { AdministrarCursosComponent } from './pages/administrar-cursos/administrar-cursos.component';
import { EncuestasComponent } from './pages/encuestas/encuestas.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { GestionAlumnocursoComponent } from '../shared/pages/gestion-alumnocurso/gestion-alumnocurso.component';
import { AbmPruebaonlineComponent } from '../shared/pages/abm-pruebaonline/abm-pruebaonline.component';
import { AbmAlumnocursoComponent } from '../shared/pages/abm-alumnocurso/abm-alumnocurso.component';
import { AdministrarCalificacionesComponent } from './pages/administrar-calificaciones/administrar-calificaciones.component';


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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocenteRoutingModule { }
