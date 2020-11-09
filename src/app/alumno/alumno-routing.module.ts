import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavAlumnoComponent } from './components/nav-alumno/nav-alumno.component';

const routes: Routes = [
  {
    path: '',
    component: NavAlumnoComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoRoutingModule {}
