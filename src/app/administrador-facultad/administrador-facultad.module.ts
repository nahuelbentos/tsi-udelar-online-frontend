import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorFacultadRoutingModule } from './administrador-facultad-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NavAdministradorFacultadComponent } from './components/nav-administrador-facultad/nav-administrador-facultad.component';

import { SharedModule } from '../shared/shared.module';
import { DocentesComponent } from './pages/docentes/docentes.component';
import { AbmDocenteComponent } from './pages/abm-docente/abm-docente.component';


@NgModule({
  declarations: [HomeComponent, NavAdministradorFacultadComponent, DocentesComponent, AbmDocenteComponent],
  imports: [
    CommonModule,
    AdministradorFacultadRoutingModule,
    SharedModule
  ]
})
export class AdministradorFacultadModule { }
