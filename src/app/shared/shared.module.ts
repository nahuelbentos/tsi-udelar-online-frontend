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
import { AbmComunicadoComponent } from './pages/abm-comunicado/abm-comunicado.component';
import { GestionComunicadoComponent } from './pages/gestion-comunicado/gestion-comunicado.component';
import { AbmTemplatecursoComponent } from './pages/abm-templatecurso/abm-templatecurso.component';
import { GestionTemplatecursoComponent } from './pages/gestion-templatecurso/gestion-templatecurso.component';
import { AbmTemaForoComponent } from './pages/abm-temaforo/abm-temaforo.component';
import { AbmRespuestaComponent } from './pages/abm-respuesta/abm-respuesta.component';

import { GestionFacultadComponent } from './pages/gestion-facultad/gestion-facultad.component';
import { AbmFacultadComponent } from './pages/abm-facultad/abm-facultad.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { GestionEncuestaComponent } from './pages/gestion-encuesta/gestion-encuesta.component';
import { AbmEncuestaComponent } from './pages/abm-encuesta/abm-encuesta.component';
import { GestionUsuarioComponent } from './pages/gestion-usuario/gestion-usuario.component';
import { GestionCarreraComponent } from './pages/gestion-carrera/gestion-carrera.component';
import { AbmCarreraComponent } from './pages/abm-carrera/abm-carrera.component';
import { GestionMaterialComponent } from './pages/gestion-material/gestion-material.component';

import { AbmMaterialComponent } from './pages/abm-material/abm-material.component';
import { MatFileUploadModule } from 'mat-file-upload';
import { GestionForoComponent } from './pages/gestion-foro/gestion-foro.component';
import { AbmForoComponent } from './pages/abm-foro/abm-foro.component';
import { AbmSeccionComponent } from './pages/abm-seccion/abm-seccion.component';
import { GestionSeccionComponent } from './pages/gestion-seccion/gestion-seccion.component';


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
    AbmComunicadoComponent,
    GestionComunicadoComponent,
    AbmTemplatecursoComponent,
    GestionTemplatecursoComponent,
    GestionFacultadComponent,
    AbmFacultadComponent,
    GestionEncuestaComponent,
    AbmEncuestaComponent,
    GestionUsuarioComponent,
    GestionCarreraComponent,
    AbmCarreraComponent,
    AbmMaterialComponent,
    GestionMaterialComponent,
    GestionForoComponent,
    AbmForoComponent,

    AbmRespuestaComponent,
    AbmTemaForoComponent,
    AbmSeccionComponent,
    GestionSeccionComponent,
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

    NgxMatColorPickerModule,
    MatFileUploadModule,
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
   ],
})
export class SharedModule { }
