import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AbmMensajetemaComponent } from './pages/abm-mensajetema/abm-mensajetema.component';
import { GestionMensajetemaComponent } from './pages/gestion-mensajetema/gestion-mensajetema.component';
import { SeleccionarCustomComponent } from './components/seleccionar-custom/seleccionar-custom.component';
import { SeleccionarCarreraComponent } from './dialogs/seleccionar-carrera/seleccionar-carrera.component';
import { SeleccionarCursoComponent } from './dialogs/seleccionar-curso/seleccionar-curso.component';
import { SeleccionarFacultadComponent } from './dialogs/seleccionar-facultad/seleccionar-facultad.component';
import { SeleccionarSeccionComponent } from './dialogs/seleccionar-seccion/seleccionar-seccion.component';
import { SeleccionarTemplateCursoComponent } from './dialogs/seleccionar-template-curso/seleccionar-template-curso.component';
import { AbmActividadComponent } from './pages/abm-actividad/abm-actividad.component';
import { GestionActividadComponent } from './pages/gestion-actividad/gestion-actividad.component';
import { GestionMensajeComponent } from './pages/gestion-mensaje/gestion-mensaje.component';
import { GestionTemaforoComponent } from './pages/gestion-temaforo/gestion-temaforo.component';
import { GestionRespuestaComponent } from './pages/gestion-respuesta/gestion-respuesta.component';
import { GestionTemplateCursoSeccionComponent } from './pages/gestion-templatecursoseccion/gestion-templatecursoseccion.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { AbmComunicadoComponent } from './pages/abm-comunicado/abm-comunicado.component';
import { AbmTemplatecursoComponent } from './pages/abm-templatecurso/abm-templatecurso.component';
import { GestionComunicadoComponent } from './pages/gestion-comunicado/gestion-comunicado.component';
import { GestionTemplatecursoComponent } from './pages/gestion-templatecurso/gestion-templatecurso.component';
import { TableDynamicCustomComponent } from './components/table-dynamic-custom/table-dynamic-custom.component';
import { TestComponentsComponent } from './pages/test-components/test-components.component';
import { AbmPublicarcomunicadoComponent } from './pages/abm-publicarcomunicado/abm-publicarcomunicado.component';
import { SeleccionarComunicadoComponent } from './dialogs/seleccionar-comunicado/seleccionar-comunicado.component';
import { AutocompleteCustomComponent } from './components/autocomplete-custom/autocomplete-custom.component';
import { RespuestasComponent } from './dialogs/respuestas/respuestas.component';
import { SeleccionarUsuarioComponent } from './dialogs/seleccionar-usuario/seleccionar-usuario.component';
import { BuscarCursosComponent } from './pages/buscar-cursos/buscar-cursos.component';
import { GestionPruebaonlineComponent } from './pages/gestion-pruebaonline/gestion-pruebaonline.component';
import { AbmAlumnocursoComponent } from './pages/abm-alumnocurso/abm-alumnocurso.component';
import { AbmCursoseccionComponent } from './pages/abm-cursoseccion/abm-cursoseccion.component';
import { AbmMensajeComponent } from './pages/abm-mensaje/abm-mensaje.component';
import { AbmPreguntaComponent } from './pages/abm-pregunta/abm-pregunta.component';
import { AbmPruebaonlineComponent } from './pages/abm-pruebaonline/abm-pruebaonline.component';
import { AbmTemplateCursoSeccionComponent } from './pages/abm-templatecursoseccion/abm-templatecursoseccion.component';
import { GestionAlumnocursoComponent } from './pages/gestion-alumnocurso/gestion-alumnocurso.component';
import { GestionCursoSeccionComponent } from './pages/gestion-cursoseccion/gestion-cursoseccion.component';
import { AbmLaboratorioComponent } from './pages/abm-laboratorio/abm-laboratorio.component';
import { GestionCalificacionesComponent } from './pages/gestion-calificaciones/gestion-calificaciones.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { VerForoComponent } from './ver-foro/ver-foro.component';
import { SeleccionarActividadComponent } from './dialogs/seleccionar-actividad/seleccionar-actividad.component';
import { SeleccionarCursoByUsuarioComponent } from './dialogs/seleccionar-curso-by-usuario/seleccionar-curso-by-usuario.component';
import { SeleccionarTrabajoComponent } from './dialogs/seleccionar-trabajo/seleccionar-trabajo.component';
import { VerCursoSeccionesComponent } from './dialogs/ver-curso-secciones/ver-curso-secciones.component';
import { GestionCalsesDictadasComponent } from './pages/gestion-calses-dictadas/gestion-calses-dictadas.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

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
    AbmMensajetemaComponent,
    GestionMensajetemaComponent,
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
    AbmMensajeComponent,
    GestionMensajeComponent,
    GestionTemaforoComponent,
    GestionRespuestaComponent,
    AbmCursoseccionComponent,
    AbmTemplateCursoSeccionComponent,
    GestionCursoSeccionComponent,
    GestionTemplateCursoSeccionComponent,
    AbmPreguntaComponent,
    GestionPruebaonlineComponent,
    AbmPruebaonlineComponent,
    AbmAlumnocursoComponent,
    GestionAlumnocursoComponent,
    AbmPublicarcomunicadoComponent,
    SeleccionarComunicadoComponent,
    SeleccionarUsuarioComponent,
    AutocompleteCustomComponent,
    RespuestasComponent,
    BuscarCursosComponent,
    AbmLaboratorioComponent,
    GestionCalificacionesComponent,
    CalendarioComponent,
    VerForoComponent,
    VerCursoSeccionesComponent,
    SeleccionarTrabajoComponent,
    SeleccionarActividadComponent,
    SeleccionarCursoByUsuarioComponent,
    GestionCalsesDictadasComponent,
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
    AbmPublicarcomunicadoComponent,
    GestionEncuestaComponent,
    GestionAlumnocursoComponent,
    GestionMaterialComponent,
    AbmLaboratorioComponent,
    GestionComunicadoComponent,
    GestionCalificacionesComponent,
    CalendarioComponent,
    GestionCustomComponent
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
    FormsModule,
    FullCalendarModule
  ],
  providers: [],
})
export class SharedModule {}
