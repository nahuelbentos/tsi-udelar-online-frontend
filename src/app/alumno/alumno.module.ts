import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VistaCalendarioComponent } from './pages/vista-calendario/vista-calendario.component';
import { CalendarioComponent } from '../shared/components/calendario/calendario.component';
import { MisCalificacionesComponent } from './dialog/mis-calificaciones/mis-calificaciones.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { EvaluacionIndividualComponent } from './pages/evaluacion-individual/evaluacion-individual.component';
import { VerComunicadosComponent } from './dialog/ver-comunicados/ver-comunicados.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavAlumnoComponent,
    MisCursosComponent,
    CursosPublicosComponent,
    VistaCursoComponent,
    SubirLaboratorioComponent,
    ResponderEncuestaComponent,
    VistaCalendarioComponent,
    MisCalificacionesComponent,
    EvaluacionIndividualComponent,
    VerComunicadosComponent,
  ],
  imports: [
    CommonModule,
    AlumnoRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FilterPipeModule,
  ],
})
export class AlumnoModule {}
