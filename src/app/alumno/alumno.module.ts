import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NavAlumnoComponent } from './components/nav-alumno/nav-alumno.component';
import { SharedModule } from '../shared/shared.module';
import { MisCursosComponent } from './pages/mis-cursos/mis-cursos.component';
import { CursosPublicosComponent } from './pages/cursos-publicos/cursos-publicos.component';
import { VistaCursoComponent } from './pages/vista-curso/vista-curso.component';
import { MaterialModule } from '../material/material.module';
import { SubirLaboratorioComponent } from './pages/subir-laboratorio/subir-laboratorio.component';
import { ResponderEncuestaComponent } from './pages/responder-encuesta/responder-encuesta.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavAlumnoComponent,
    MisCursosComponent,
    CursosPublicosComponent,
    VistaCursoComponent,
    SubirLaboratorioComponent,
    ResponderEncuestaComponent
  ],
  imports: [CommonModule, AlumnoRoutingModule, SharedModule, MaterialModule],
})
export class AlumnoModule {}
