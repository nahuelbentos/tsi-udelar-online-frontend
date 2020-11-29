import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NavAlumnoComponent } from './components/nav-alumno/nav-alumno.component';
import { SharedModule } from '../shared/shared.module';
import { MisCursosComponent } from './pages/mis-cursos/mis-cursos.component';
import { CursosPublicosComponent } from './pages/cursos-publicos/cursos-publicos.component';

@NgModule({
  declarations: [HomeComponent, NavAlumnoComponent, MisCursosComponent, CursosPublicosComponent],
  imports: [CommonModule, AlumnoRoutingModule, SharedModule],
})
export class AlumnoModule {}
