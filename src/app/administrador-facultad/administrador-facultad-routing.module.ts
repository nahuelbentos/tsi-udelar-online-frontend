import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

import { AbmCarreraComponent } from '../shared/pages/abm-carrera/abm-carrera.component';
import { AbmComunicadoComponent } from '../shared/pages/abm-comunicado/abm-comunicado.component';
import { AbmCursoComponent } from '../shared/pages/abm-curso/abm-curso.component';
import { AbmEncuestaComponent } from '../shared/pages/abm-encuesta/abm-encuesta.component';
import { AbmFacultadComponent } from '../shared/pages/abm-facultad/abm-facultad.component';
import { AbmForoComponent } from '../shared/pages/abm-foro/abm-foro.component';
import { AbmMaterialComponent } from '../shared/pages/abm-material/abm-material.component';
import { AbmTemplatecursoComponent } from '../shared/pages/abm-templatecurso/abm-templatecurso.component';
import { AbmUsuarioComponent } from '../shared/pages/abm-usuario/abm-usuario.component';
import { GestionCarreraComponent } from '../shared/pages/gestion-carrera/gestion-carrera.component';
import { GestionComunicadoComponent } from '../shared/pages/gestion-comunicado/gestion-comunicado.component';
import { GestionCursoComponent } from '../shared/pages/gestion-curso/gestion-curso.component';
import { GestionEncuestaComponent } from '../shared/pages/gestion-encuesta/gestion-encuesta.component';
import { GestionFacultadComponent } from '../shared/pages/gestion-facultad/gestion-facultad.component';
import { GestionForoComponent } from '../shared/pages/gestion-foro/gestion-foro.component';
import { GestionMaterialComponent } from '../shared/pages/gestion-material/gestion-material.component';
import { GestionTemplatecursoComponent } from '../shared/pages/gestion-templatecurso/gestion-templatecurso.component';
import { GestionUsuarioComponent } from '../shared/pages/gestion-usuario/gestion-usuario.component';
import { NavAdministradorFacultadComponent } from './components/nav-administrador-facultad/nav-administrador-facultad.component';
import { AbmDocenteComponent } from './pages/abm-docente/abm-docente.component';
import { AdministrarMaterialesComponent } from './pages/administrar-materiales/administrar-materiales.component';
import { CarrerasComponent } from './pages/carreras/carreras.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { DocentesComponent } from './pages/docentes/docentes.component';
import { HomeComponent } from './pages/home/home.component';
import { PublicarComunicadoCursoComponent } from './pages/publicar-comunicado-curso/publicar-comunicado-curso.component';


const routes: Routes = [
  {
    path: '',
    component: NavAdministradorFacultadComponent,
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { role: 'administradorfacultad' },
    children: [
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
        path: 'carrera',
        component: CarrerasComponent,
        data: { titulo: 'Gestión de Carreras' },
      },
      {
        path: 'carrera/abm-carrera',
        component: AbmCarreraComponent,
        data: { titulo: 'ABM de Carreras' },
      },
      {
        path: 'curso',
        component: CursosComponent,
        data: { titulo: 'Gestión de Cursos' },
      },
      {
        path: 'curso/abm-curso',
        component: AbmCursoComponent,
        data: { titulo: 'ABM Cursos' },
      },
      {
        path: 'templatecurso',
        component: GestionTemplatecursoComponent,
        data: { titulo: 'Gestión de Template Cursos' },
      },
      {
        path: 'templatecurso/abm-templatecurso',
        component: AbmTemplatecursoComponent,
        data: { titulo: 'ABM de Template Cursos' },
      },

      {
        path: 'encuesta',
        component: GestionEncuestaComponent,
        data: { titulo: 'Gestión de Encuestas' },
      },

      {
        path: 'usuario',
        component: GestionUsuarioComponent,
        data: { titulo: 'Gestión de Usuarios' },
      },
      {
        path: 'usuario',
        component: GestionUsuarioComponent,
        data: { titulo: 'Gestión de Usuarios' },
      },
      {
        path: 'reportes',
        component: HomeComponent,
        data: { titulo: 'Reportes' },
      },
      {
        path: 'administrar-materiales',
        component: AdministrarMaterialesComponent,
        data: { titulo: 'Administrar materiales' },
      },

      {
        path: 'administrar-materiales/abm-material',
        component: AbmMaterialComponent,
        data: { titulo: 'ABM de materiales' },
      },

      {
        path: 'foro',
        component: GestionForoComponent,
        data: { titulo: 'Gestión de foros' },
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
        path: 'docente',
        component: DocentesComponent,
        data: { titulo: 'Gestión de Docentes' },
      },
      {
        path: 'docente/abm-docente',
        component: AbmDocenteComponent,
        data: { titulo: 'ABM de docentes' },
      },
      {
        path: 'comunicado',
        component: GestionComunicadoComponent,
        data: { titulo: 'Gestión de Comunicados' },
      },
      {
        path: 'comunicado/abm-comunicado',
        component: AbmComunicadoComponent,
        data: { titulo: 'ABM de Comunicados' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorFacultadRoutingModule { }
