import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NavAlumnoComponent } from './components/nav-alumno/nav-alumno.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, NavAlumnoComponent],
  imports: [CommonModule, AlumnoRoutingModule, SharedModule],
})
export class AlumnoModule {}
