import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbmRespuestaComponent } from '../shared/pages/abm-respuesta/abm-respuesta.component';
import { AbmTemaForoComponent } from '../shared/pages/abm-temaforo/abm-temaforo.component';
import { GestionCursoComponent } from '../shared/pages/gestion-curso/gestion-curso.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
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
