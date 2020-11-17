import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbmComunicadoComponent } from '../shared/pages/abm-comunicado/abm-comunicado.component';
import { AbmCursoComponent } from '../shared/pages/abm-curso/abm-curso.component';
import { AbmTemplatecursoComponent } from '../shared/pages/abm-templatecurso/abm-templatecurso.component';
import { AbmUsuarioComponent } from '../shared/pages/abm-usuario/abm-usuario.component';
import { GestionComunicadoComponent } from '../shared/pages/gestion-comunicado/gestion-comunicado.component';
import { GestionCursoComponent } from '../shared/pages/gestion-curso/gestion-curso.component';
import { GestionTemplatecursoComponent } from '../shared/pages/gestion-templatecurso/gestion-templatecurso.component';
import { AbmCarreraComponent } from '../shared/pages/abm-carrera/abm-carrera.component';
import { AbmEncuestaComponent } from '../shared/pages/abm-encuesta/abm-encuesta.component';
import { AbmFacultadComponent } from '../shared/pages/abm-facultad/abm-facultad.component';
import { AbmForoComponent } from '../shared/pages/abm-foro/abm-foro.component';

import { AbmMaterialComponent } from '../shared/pages/abm-material/abm-material.component';
import { AbmSeccionComponent } from '../shared/pages/abm-seccion/abm-seccion.component';
import { GestionCarreraComponent } from '../shared/pages/gestion-carrera/gestion-carrera.component';
import { GestionEncuestaComponent } from '../shared/pages/gestion-encuesta/gestion-encuesta.component';
import { GestionFacultadComponent } from '../shared/pages/gestion-facultad/gestion-facultad.component';

import { GestionForoComponent } from '../shared/pages/gestion-foro/gestion-foro.component';

import { GestionMaterialComponent } from '../shared/pages/gestion-material/gestion-material.component';
import { GestionSeccionComponent } from '../shared/pages/gestion-seccion/gestion-seccion.component';
import { GestionUsuarioComponent } from '../shared/pages/gestion-usuario/gestion-usuario.component';
import { NavAdministradorComponent } from './components/nav-administrador/nav-administrador.component';

const routes: Routes = [
  {


    path: '',
    component: NavAdministradorComponent,
    children: [
      {
        path: 'curso',
        component: GestionCursoComponent,
        data: { titulo: 'Gestión de Cursos' },
      },

      {
        path: 'curso/abm-curso',
        component: AbmCursoComponent,
        data: { titulo: 'ABM de Cursos' },
      },
      {
        path: 'carrera',
        component: GestionCarreraComponent,
        data: { titulo: 'Gestión de Carreras' },
      },

      {
        path: 'carrera/abm-carrera',
        component: AbmCarreraComponent,
        data: { titulo: 'ABM de Carreras' },
      },
      {
        path: 'comunicado',
        component: GestionComunicadoComponent,
        data: { titulo: 'Gestión de Comunicados' },
      },
      {
        path: 'templatecurso',
        component: GestionTemplatecursoComponent,
        data: { titulo: 'Gestión de TemplateCurso' },
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
        path: 'usuario',
        component: GestionUsuarioComponent,
        data: { titulo: 'Gestión de Usuarios' },
      },

      {
        path: 'usuario/abm-usuario',
        component: AbmUsuarioComponent,
        data: { titulo: 'ABM de Usuarios' },
      },
      {
        path: 'comunicado/abm-comunicado',
        component: AbmComunicadoComponent,
        data: { titulo: 'ABM de Comunicados' },
      },
      {
        path: 'templatecurso/abm-templatecurso',
        component: AbmTemplatecursoComponent,
        data: { titulo: 'ABM de TemplateCurso' },
      },
      {
        path: 'material',
        component: GestionMaterialComponent,
        data: { titulo: 'Gestión de materiales' },
      },

      {
        path: 'material/abm-material',
        component: AbmMaterialComponent,
        data: { titulo: 'ABM de materiales' },
      },

      {
        path: 'foro',
        component: GestionForoComponent,
        data: { titulo: 'Gestión de foros' },
      },

      {
        path: 'foro/abm-foro',
        component: AbmForoComponent,
        data: { titulo: 'ABM de foros' },
      },

      {
        path: 'seccion',
        component: GestionSeccionComponent,
        data: { titulo: 'Gestión de secciones' },
      },

      {
        path: 'seccion/abm-seccion',
        component: AbmSeccionComponent,
        data: { titulo: 'ABM de secciones' },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorRoutingModule { }
