import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorFacultadRoutingModule } from './administrador-facultad-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NavAdministradorFacultadComponent } from './components/nav-administrador-facultad/nav-administrador-facultad.component';

import { SharedModule } from '../shared/shared.module';
import { DocentesComponent } from './pages/docentes/docentes.component';
import { AbmDocenteComponent } from './pages/abm-docente/abm-docente.component';

import { CarrerasComponent } from './pages/carreras/carreras.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { EncuestasComponent } from './pages/encuestas/encuestas.component';
import { PublicarComunicadoCursoComponent } from './pages/publicar-comunicado-curso/publicar-comunicado-curso.component';
import { MaterialModule } from '../material/material.module';
import { AdministrarCalificacionesComponent } from '../docente/pages/administrar-calificaciones/administrar-calificaciones.component';
import { AdministrarFacultadComponent } from './pages/administrar-facultad/administrar-facultad.component';
import { AdministrarUsuariosComponent } from './pages/administrar-usuarios/administrar-usuarios.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavAdministradorFacultadComponent,
    DocentesComponent,
    AbmDocenteComponent,
    CursosComponent,
    CarrerasComponent,
    EncuestasComponent,
    PublicarComunicadoCursoComponent,
    AdministrarFacultadComponent,
    AdministrarUsuariosComponent,
  ],
  imports: [
    CommonModule,
    AdministradorFacultadRoutingModule,
    SharedModule,
    MaterialModule,
  ],
})
export class AdministradorFacultadModule {}
