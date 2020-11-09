import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbmCursoComponent } from '../shared/pages/abm-curso/abm-curso.component';
import { AbmEncuestaComponent } from '../shared/pages/abm-encuesta/abm-encuesta.component';
import { AbmFacultadComponent } from '../shared/pages/abm-facultad/abm-facultad.component';
import { AbmUsuarioComponent } from '../shared/pages/abm-usuario/abm-usuario.component';
import { GestionCursoComponent } from '../shared/pages/gestion-curso/gestion-curso.component';
import { GestionEncuestaComponent } from '../shared/pages/gestion-encuesta/gestion-encuesta.component';
import { GestionFacultadComponent } from '../shared/pages/gestion-facultad/gestion-facultad.component';
import { NavAdministradorComponent } from './components/nav-administrador/nav-administrador.component';

const routes: Routes = [
  {
    path: '',
    component: NavAdministradorComponent,
    children: [
      {
        path: 'curso/abm-curso',
        component: AbmCursoComponent,
        data: { titulo: 'ABM de Cursos' },
      },
      {
        path: 'curso',
        component: GestionCursoComponent,
        data: { titulo: 'Gestión de Cursos' },
      },
      {
        path: 'facultad',
        component: GestionFacultadComponent,
        data: { titulo: 'Gestión de Facultades' },
      },
      {
        path: 'facultad/abm-facultad',
        component: AbmFacultadComponent,
        data: { titulo: 'ABM de Facultades' },
      },
      {
        path: 'encuesta',
        component: GestionEncuestaComponent,
        data: { titulo: 'Gestión de Encuestas' },
      },
      {
        path: 'encuesta/abm-encuesta',
        component: AbmEncuestaComponent,
        data: { titulo: 'ABM de Encuestas' },
      },
      {
        path: 'usuario/abm-usuario',
        component: AbmUsuarioComponent,
        data: { titulo: 'ABM de Usuarios' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorRoutingModule {}
