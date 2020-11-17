import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorFacultadRoutingModule } from './administrador-facultad-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NavAdministradorFacultadComponent } from './components/nav-administrador-facultad/nav-administrador-facultad.component';


@NgModule({
  declarations: [HomeComponent, NavAdministradorFacultadComponent],
  imports: [
    CommonModule,
    AdministradorFacultadRoutingModule
  ]
})
export class AdministradorFacultadModule { }
