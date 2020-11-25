import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

import { AbmCarreraComponent } from '../shared/pages/abm-carrera/abm-carrera.component';
import { AbmCursoComponent } from '../shared/pages/abm-curso/abm-curso.component';
import { AbmEncuestaComponent } from '../shared/pages/abm-encuesta/abm-encuesta.component';
import { AbmFacultadComponent } from '../shared/pages/abm-facultad/abm-facultad.component';
import { AbmForoComponent } from '../shared/pages/abm-foro/abm-foro.component';
import { AbmMaterialComponent } from '../shared/pages/abm-material/abm-material.component';
import { AbmUsuarioComponent } from '../shared/pages/abm-usuario/abm-usuario.component';
import { GestionCarreraComponent } from '../shared/pages/gestion-carrera/gestion-carrera.component';
import { GestionCursoComponent } from '../shared/pages/gestion-curso/gestion-curso.component';
import { GestionEncuestaComponent } from '../shared/pages/gestion-encuesta/gestion-encuesta.component';
import { GestionFacultadComponent } from '../shared/pages/gestion-facultad/gestion-facultad.component';
import { GestionForoComponent } from '../shared/pages/gestion-foro/gestion-foro.component';
import { GestionMaterialComponent } from '../shared/pages/gestion-material/gestion-material.component';
import { GestionTemplatecursoComponent } from '../shared/pages/gestion-templatecurso/gestion-templatecurso.component';
import { GestionUsuarioComponent } from '../shared/pages/gestion-usuario/gestion-usuario.component';
import { NavAdministradorFacultadComponent } from './components/nav-administrador-facultad/nav-administrador-facultad.component';


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
        path: 'carrera',
        component: GestionCarreraComponent,
        data: { titulo: 'Gestión de Carreras' },
      },
      {
        path: 'curso',
        component: GestionCursoComponent,
        data: { titulo: 'Gestión de Cursos' },
      },
      {
        path: 'template-curso',
        component: GestionTemplatecursoComponent,
        data: { titulo: 'Gestión de Template Cursos' },
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
        path: 'material',
        component: GestionMaterialComponent,
        data: { titulo: 'Gestión de materiales' },
      },

      {
        path: 'foro',
        component: GestionForoComponent,
        data: { titulo: 'Gestión de foros' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorFacultadRoutingModule { }
