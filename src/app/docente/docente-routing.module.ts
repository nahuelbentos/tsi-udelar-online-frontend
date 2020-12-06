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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocenteRoutingModule { }
