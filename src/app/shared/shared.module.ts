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
import { NavCustomComponent } from './components/nav-custom/nav-custom.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { GestionUsuarioComponent } from './pages/gestion-usuario/gestion-usuario.component';
import { GestionCarreraComponent } from './pages/gestion-carrera/gestion-carrera.component';
import { AbmCarreraComponent } from './pages/abm-carrera/abm-carrera.component';
import { GestionMaterialComponent } from './pages/gestion-material/gestion-material.component';

import { AbmMaterialComponent } from './pages/abm-material/abm-material.component';
import { MatFileUploadModule } from 'mat-file-upload';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AbmUsuarioComponent,
    AbmCursoComponent,
    GestionCustomComponent,
    GestionCursoComponent,
    NavCustomComponent,
    GestionUsuarioComponent,
    GestionCarreraComponent,
    AbmCarreraComponent,
    AbmMaterialComponent,
    GestionMaterialComponent,
  ],
  exports: [HeaderComponent, FooterComponent, NavCustomComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatFileUploadModule,
  ],
})
export class SharedModule {}
