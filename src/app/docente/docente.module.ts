import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocenteRoutingModule } from './docente-routing.module';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DocenteRoutingModule
  ]
})
export class DocenteModule { }
