import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { AbmRespuestaComponent } from '../shared/pages/abm-respuesta/abm-respuesta.component';
import { AbmTemaForoComponent } from '../shared/pages/abm-temaforo/abm-temaforo.component';
import { GestionCursoComponent } from '../shared/pages/gestion-curso/gestion-curso.component';
import { NavDocenteComponent } from './components/nav-docente/nav-docente.component';


const routes: Routes = [
  {
    path: '',
    component: NavDocenteComponent,
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { role: 'docente' },
    children: [
      {
        path: 'temaforo/abm-temaforo',
        component: AbmTemaForoComponent,
        data: { titulo: 'ABM de TemaForo' },
      },
      {
        path: 'curso',
        component: GestionCursoComponent,
        data: { titulo: 'Gestión de Cursos' },
      },
      {
        path: 'respuesta/abm-respuesta',
        component: AbmRespuestaComponent,
        data: { titulo: 'ABM de Respuesta' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocenteRoutingModule { }
