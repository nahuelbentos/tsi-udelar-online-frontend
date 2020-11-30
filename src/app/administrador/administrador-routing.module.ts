import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbmComunicadoComponent } from '../shared/pages/abm-comunicado/abm-comunicado.component';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { AbmActividadComponent } from '../shared/pages/abm-actividad/abm-actividad.component';

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

import { GestionMensajeComponent } from '../shared/pages/gestion-mensaje/gestion-mensaje.component';
import { GestionRespuestaComponent } from '../shared/pages/gestion-respuesta/gestion-respuesta.component';
import { GestionTemaforoComponent } from '../shared/pages/gestion-temaforo/gestion-temaforo.component';
import { GestionTemplateCursoSeccionComponent } from '../shared/pages/gestion-templatecursoseccion/gestion-templatecursoseccion.component';

import { AbmMaterialComponent } from '../shared/pages/abm-material/abm-material.component';
import { AbmRespuestaComponent } from '../shared/pages/abm-respuesta/abm-respuesta.component';
import { AbmSeccionComponent } from '../shared/pages/abm-seccion/abm-seccion.component';
import { AbmTemaForoComponent } from '../shared/pages/abm-temaforo/abm-temaforo.component';

import { GestionActividadComponent } from '../shared/pages/gestion-actividad/gestion-actividad.component';

import { GestionCarreraComponent } from '../shared/pages/gestion-carrera/gestion-carrera.component';
import { GestionEncuestaComponent } from '../shared/pages/gestion-encuesta/gestion-encuesta.component';
import { GestionFacultadComponent } from '../shared/pages/gestion-facultad/gestion-facultad.component';

import { GestionForoComponent } from '../shared/pages/gestion-foro/gestion-foro.component';

import { GestionMaterialComponent } from '../shared/pages/gestion-material/gestion-material.component';
import { GestionSeccionComponent } from '../shared/pages/gestion-seccion/gestion-seccion.component';
import { GestionUsuarioComponent } from '../shared/pages/gestion-usuario/gestion-usuario.component';
import { NavAdministradorComponent } from './components/nav-administrador/nav-administrador.component';
import { GestionMensajetemaComponent } from '../shared/pages/gestion-mensajetema/gestion-mensajetema.component';
import { AbmMensajetemaComponent } from '../shared/pages/abm-mensajetema/abm-mensajetema.component';
import { TestComponentsComponent } from '../shared/pages/test-components/test-components.component';
import { AbmPublicarcomunicadoComponent } from '../shared/pages/abm-publicarcomunicado/abm-publicarcomunicado.component';
import { PublicarComunicadoComponent } from './pages/publicar-comunicado/publicar-comunicado.component';
import { HomeComponent } from './pages/home/home.component';
import { GestionarCursosComponent } from './pages/gestionar-cursos/gestionar-cursos.component';
import { AbmCursoseccionComponent } from '../shared/pages/abm-cursoseccion/abm-cursoseccion.component';
import { AbmMensajeComponent } from '../shared/pages/abm-mensaje/abm-mensaje.component';
import { AbmTemplateCursoSeccionComponent } from '../shared/pages/abm-templatecursoseccion/abm-templatecursoseccion.component';
import { GestionCursoSeccionComponent } from '../shared/pages/gestion-cursoseccion/gestion-cursoseccion.component';

const routes: Routes = [
  {
    path: '',
    component: NavAdministradorComponent,
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { role: 'administrador' },
    children: [
      {
        path: 'curso',
        component: GestionarCursosComponent,
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
        path: 'actividad',
        component: GestionActividadComponent,
        data: { titulo: 'Gestión de actividades' },
      },

      {
        path: 'actividad/abm-actividad',
        component: AbmActividadComponent,
        data: { titulo: 'ABM de actividades' },
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

      {
        path: 'mensajetema',
        component: GestionMensajetemaComponent,
        data: { titulo: 'Mensaje Tema' },
      },

      {
        path: 'mensajetema/abm-mensajetema',
        component: AbmMensajetemaComponent,
        data: { titulo: 'ABM de mensaje tema' },
      },

      {
        path: 'temaforo/abm-temaforo',
        component: AbmTemaForoComponent,
        data: { titulo: 'ABM de tema foro' },
      },

      {
        path: 'respuesta',
        component: GestionRespuestaComponent,
        data: { titulo: 'Gestion de Respuesta' },
      },
      {
        path: 'respuesta/abm-respuesta',
        component: AbmRespuestaComponent,
        data: { titulo: 'ABM de Respuesta' },
      },

      {
        path: 'test-components',
        component: TestComponentsComponent,
        data: { titulo: 'Test components' },
      },
      {
        path: 'publicar-comunicado-facultad',
        component: PublicarComunicadoComponent,
        data: { titulo: 'Publicar Comunicado Facultad' },
      },
      {
        path: 'reportes',
        component: HomeComponent,
        data: { titulo: 'Reportes' },
      },
      {
        path: 'reportes/facultades',
        component: GestionFacultadComponent,
        data: { titulo: 'Listado de facultades' },
      },
      {
        path: 'reportes/curso-facultades',
        component: GestionCursoComponent,
        data: { titulo: 'Listado de cursos por facultades' },
      },
      {
        path: 'reportes/curso-estadisticas',
        component: GestionCursoComponent,
        data: { titulo: 'Información estadística de cursos' },
      },
      {
        path: 'reportes/facultades-estadisticas',
        component: GestionFacultadComponent,
        data: { titulo: 'Información estadística de facultades' },
      },

      {
        path: 'cursoseccion',
        component: GestionCursoSeccionComponent,
        data: { titulo: 'Gestión de secciones de un curso' },
      },

      {
        path: 'cursoseccion/abm-cursoseccion',
        component: AbmCursoseccionComponent,
        data: { titulo: 'ABM de  curso secciones' },
      },

      {
        path: 'mensaje',
        component: GestionMensajeComponent,
        data: { titulo: 'Gestión de mensajes' },
      },

      {
        path: 'mensaje/abm-mensaje',
        component: AbmMensajeComponent,
        data: { titulo: 'ABM de mensajes' },
      },

      {
        path: 'respuesta',
        component: GestionRespuestaComponent,
        data: { titulo: 'Gestión de respuesta' },
      },

      {
        path: 'respuesta/abm-respuesta',
        component: AbmRespuestaComponent,
        data: { titulo: 'ABM de respuesta' },
      },

      {
        path: 'temaforo',
        component: GestionTemaforoComponent,
        data: { titulo: 'Gestión de temas de un foro' },
      },

      {
        path: 'templatecurso',
        component: GestionTemplatecursoComponent,
        data: { titulo: 'Gestión de template de un curso' },
      },

      {
        path: 'templatecurso/abm-templatecurso',
        component: AbmTemplatecursoComponent,
        data: { titulo: 'ABM de template curso' },
      },

      {
        path: 'templatecursoseccion',
        component: GestionTemplateCursoSeccionComponent,
        data: { titulo: 'Gestión de seccion template de un curso' },
      },

      {
        path: 'templatecursoseccion/abm-templatecursoseccion',
        component: AbmTemplateCursoSeccionComponent,
        data: { titulo: 'ABM de templatecursoseccion' },
      },
      {
        path: 'test',
        component: TestComponentsComponent,
        data: { titulo: 'test' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorRoutingModule {}
