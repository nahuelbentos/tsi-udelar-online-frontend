import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocenteRoutingModule } from './docente-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavDocenteComponent } from './components/nav-docente/nav-docente.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { AdministrarCursosComponent } from './pages/administrar-cursos/administrar-cursos.component';
import { EncuestasComponent } from './pages/encuestas/encuestas.component';
import { AdministrarMaterialesComponent } from '../administrador-facultad/pages/administrar-materiales/administrar-materiales.component';


@NgModule({
  declarations: [HomeComponent,  NavDocenteComponent, EstudiantesComponent, AdministrarCursosComponent, EncuestasComponent, AdministrarMaterialesComponent],
  imports: [
    CommonModule,
    DocenteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MaterialModule,
    SharedModule
  ]
})
export class DocenteModule { }
