import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbmComunicadoComponent } from '../shared/pages/abm-comunicado/abm-comunicado.component';
import { AbmCursoComponent } from '../shared/pages/abm-curso/abm-curso.component';
import { AbmTemplatecursoComponent } from '../shared/pages/abm-templatecurso/abm-templatecurso.component';
import { AbmUsuarioComponent } from '../shared/pages/abm-usuario/abm-usuario.component';
import { GestionComunicadoComponent } from '../shared/pages/gestion-comunicado/gestion-comunicado.component';
import { GestionCursoComponent } from '../shared/pages/gestion-curso/gestion-curso.component';
import { GestionTemplatecursoComponent } from '../shared/pages/gestion-templatecurso/gestion-templatecurso.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorRoutingModule {}
