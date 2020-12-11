import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { NavAdministradorComponent } from './components/nav-administrador/nav-administrador.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { GestionarCursosComponent } from './pages/gestionar-cursos/gestionar-cursos.component';
import { PublicarComunicadoComponent } from './pages/publicar-comunicado/publicar-comunicado.component';
import { EncuestasComponent } from './pages/encuestas/encuestas.component';
import { GraficaCursoComponent } from './components/grafica-curso/grafica-curso.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    HomeComponent,
    NavAdministradorComponent,
    GestionarCursosComponent,
    EncuestasComponent,
    PublicarComunicadoComponent,
    GraficaCursoComponent,
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    SharedModule,
    MaterialModule,
    ChartsModule,
  ],
})
export class AdministradorModule {}
