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
import { SeleccionarCustomComponent } from './components/seleccionar-custom/seleccionar-custom.component';
import { SeleccionarSeccionComponent } from './dialogs/seleccionar-seccion/seleccionar-seccion.component';
import { SeleccionarFacultadComponent } from './dialogs/seleccionar-facultad/seleccionar-facultad.component';
import { SeleccionarCursoComponent } from './dialogs/seleccionar-curso/seleccionar-curso.component';
import { SeleccionarCarreraComponent } from './dialogs/seleccionar-carrera/seleccionar-carrera.component';
import { SeleccionarTemplateCursoComponent } from './dialogs/seleccionar-template-curso/seleccionar-template-curso.component';
import { AbmActividadComponent } from './pages/abm-actividad/abm-actividad.component';
import { GestionActividadComponent } from './pages/gestion-actividad/gestion-actividad.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { AbmComunicadoComponent } from './pages/abm-comunicado/abm-comunicado.component';
import { AbmTemplatecursoComponent } from './pages/abm-templatecurso/abm-templatecurso.component';
import { GestionComunicadoComponent } from './pages/gestion-comunicado/gestion-comunicado.component';
import { GestionTemplatecursoComponent } from './pages/gestion-templatecurso/gestion-templatecurso.component';
import { TableDynamicCustomComponent } from './components/table-dynamic-custom/table-dynamic-custom.component';
import { TestComponentsComponent } from './pages/test-components/test-components.component';
import { SeleccionarUsuarioComponent } from './dialogs/seleccionar-usuario/seleccionar-usuario.component';
import { AutocompleteCustomComponent } from './components/autocomplete-custom/autocomplete-custom.component';


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
    SeleccionarCustomComponent,
    SeleccionarSeccionComponent,
    SeleccionarFacultadComponent,
    SeleccionarCursoComponent,
    SeleccionarCarreraComponent,
    SeleccionarTemplateCursoComponent,
    AbmActividadComponent,
    GestionActividadComponent,
    PerfilUsuarioComponent,
    TableDynamicCustomComponent,
    TestComponentsComponent,
    SeleccionarUsuarioComponent,
    AutocompleteCustomComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavCustomComponent,
    GestionUsuarioComponent,
    AbmUsuarioComponent,
    GestionFacultadComponent,
    GestionCarreraComponent,
    GestionCursoComponent,
    SeleccionarUsuarioComponent,
    AutocompleteCustomComponent,
  ],
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
  providers: [],
})
export class SharedModule {}
