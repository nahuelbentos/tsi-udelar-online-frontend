import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbmCursoComponent } from '../shared/pages/abm-curso/abm-curso.component';
import { AbmUsuarioComponent } from '../shared/pages/abm-usuario/abm-usuario.component';
import { GestionCursoComponent } from '../shared/pages/gestion-curso/gestion-curso.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
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
        path: '/usuario/abm-usuario',
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
