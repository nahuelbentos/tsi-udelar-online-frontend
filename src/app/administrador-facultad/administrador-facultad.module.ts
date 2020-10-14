import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorFacultadRoutingModule } from './administrador-facultad-routing.module';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AdministradorFacultadRoutingModule
  ]
})
export class AdministradorFacultadModule { }
