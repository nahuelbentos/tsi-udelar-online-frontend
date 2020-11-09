import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbmCarreraComponent } from '../shared/pages/abm-carrera/abm-carrera.component';
import { AbmCursoComponent } from '../shared/pages/abm-curso/abm-curso.component';
import { AbmForoComponent } from '../shared/pages/abm-foro/abm-foro.component';

import { AbmMaterialComponent } from '../shared/pages/abm-material/abm-material.component';
import { AbmUsuarioComponent } from '../shared/pages/abm-usuario/abm-usuario.component';
import { GestionCarreraComponent } from '../shared/pages/gestion-carrera/gestion-carrera.component';
import { GestionCursoComponent } from '../shared/pages/gestion-curso/gestion-curso.component';
import { GestionForoComponent } from '../shared/pages/gestion-foro/gestion-foro.component';

import { GestionMaterialComponent } from '../shared/pages/gestion-material/gestion-material.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorRoutingModule {}
