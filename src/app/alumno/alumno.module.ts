import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AlumnoRoutingModule
  ]
})
export class AlumnoModule { }
