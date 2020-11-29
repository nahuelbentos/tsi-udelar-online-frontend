import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { AbmEncuestaComponent } from '../shared/pages/abm-encuesta/abm-encuesta.component';
import { PerfilUsuarioComponent } from '../shared/pages/perfil-usuario/perfil-usuario.component';
import { NavDocenteComponent } from './components/nav-docente/nav-docente.component';
import { AdministrarCursosComponent } from './pages/administrar-cursos/administrar-cursos.component';
import { EncuestasComponent } from './pages/encuestas/encuestas.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';


const routes: Routes = [
  {
    path: '',
    component: NavDocenteComponent,
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { role: 'docente' },
    children: [
      {
        path: 'curso',
        component: AdministrarCursosComponent,
        data: { titulo: 'Administrar Cursos' },
      },
      {
        path: 'perfil',
        component: PerfilUsuarioComponent,
        data: { titulo: 'Perfil de Usuario' },
      },
      {
        path: 'estudiantes',
        component: EstudiantesComponent,
        data: { titulo: 'Estudiantes' },
      },
      {
        path: 'encuestas',
        component: EncuestasComponent,
        data: { titulo: 'Encuestas' },
      },
      {
        path: 'encuesta/abm-encuesta',
        component: AbmEncuestaComponent,
        data: { titulo: 'ABM de Encuestas' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocenteRoutingModule { }
