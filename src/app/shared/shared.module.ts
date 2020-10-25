import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AbmUsuarioComponent } from './pages/abm-usuario/abm-usuario.component';
import { AbmCursoComponent } from './pages/abm-curso/abm-curso.component';
import { GestionCustomComponent } from './components/gestion-custom/gestion-custom.component';
import { GestionCursoComponent } from './pages/gestion-curso/gestion-curso.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AbmUsuarioComponent,
    AbmCursoComponent,
    GestionCustomComponent,
    GestionCursoComponent,
  ],
  exports: [HeaderComponent, FooterComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class SharedModule {}
