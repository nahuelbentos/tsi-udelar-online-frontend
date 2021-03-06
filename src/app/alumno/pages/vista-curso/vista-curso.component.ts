import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivdadTipo } from 'src/app/models/actividad-tipo';
import { Actividad } from 'src/app/models/actividad.model';
import { Comunicado } from 'src/app/models/Comunicado';
import { Curso } from 'src/app/models/curso.model';
import { Foro } from 'src/app/models/foro.model';
import { Material } from 'src/app/models/material.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CursoService } from 'src/app/services/curso.service';
import { ZoomComponent } from 'src/app/shared/components/zoom/zoom.component';
import { GestionAlumnocursoComponent } from 'src/app/shared/pages/gestion-alumnocurso/gestion-alumnocurso.component';
import { confirmacionUsuario, errorMensaje } from 'src/app/utils/sweet-alert';
import { MisCalificacionesComponent } from '../../dialog/mis-calificaciones/mis-calificaciones.component';
import { VerComunicadosComponent } from '../../dialog/ver-comunicados/ver-comunicados.component';
import { VistaCalendarioComponent } from '../vista-calendario/vista-calendario.component';

@Component({
  selector: 'app-vista-curso',
  templateUrl: './vista-curso.component.html',
  styleUrls: ['./vista-curso.component.scss'],
})
export class VistaCursoComponent implements OnInit {
  cursoId: string;
  curso: Curso;
  usuarioLogueado = this.autenticacionService.getUser();

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    private autenticacionService: AutenticacionService,
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      console.log('parm:: ', param);

      this.cursoId = param.id;

      if (param.id) {
        this.cursoService
          .getCursoById(this.cursoId)
          .subscribe((curso) => (this.curso = curso));
      }
    });
  }

  accionActividad(activdadTipo: ActivdadTipo) {
    console.log('actividad: ', activdadTipo);
    let params;
    switch (activdadTipo.tipo) {
      case 'Encuesta':
        params = {
          id: activdadTipo.actividad.actividadId,
        };
        this.router.navigate([`/alumno/responder-encuesta`], {
          queryParams: params,
          relativeTo: this.route,
        });
        break;
      case 'ClaseDictada':
        console.log('not implemented yet');
        break;
      case 'Trabajo':
        params = {
          actividadId: activdadTipo.actividad.actividadId,
          tipo: TipoUsuario.Alumno,
          modo: 'INS',
        };
        this.router.navigate(
          [
            `/${this.autenticacionService
              .getRolSesion()
              .toLocaleLowerCase()}/subir-laboratorio`,
          ],
          {
            queryParams: params,
            relativeTo: this.route,
          }
        );
        break;
      case 'PruebaOnline':
        console.log('actividad:: ', activdadTipo);
        this.alumnoService
          .realizoEvaluacion(
            this.usuarioLogueado.id,
            activdadTipo.actividad.actividadId
          )
          .subscribe((realizoEvaluacion) =>
            this.evaluarInscripcion(realizoEvaluacion, activdadTipo)
          );
        break;

      default:
        break;
    }
  }

  evaluarInscripcion(realizoEvaluacion: boolean, activdadTipo: ActivdadTipo) {
    realizoEvaluacion
      ? errorMensaje(
          'Evaluación realizada',
          'Ya realizaste esta evaluación, verifica tus calificaciones.'
        ).then()
      : this.alumnoService
          .estaInscriptoEvaluacion(
            this.usuarioLogueado.id,
            activdadTipo.actividad.actividadId
          )
          .subscribe((estaInscripto) => {
            if (estaInscripto) {
              // ir a la pantalla de evaluación
              this.accederAPruebaOnline(activdadTipo.actividad);
            } else {
              confirmacionUsuario(
                'Confirmacion de usuario',
                `Está por inscribirse a la evaluación ${activdadTipo.actividad.nombre}, desea continuar?`
              ).then((response) => {
                if (response.isConfirmed) {
                  this.alumnoService
                    .inscribirseAEvaluacion(
                      this.usuarioLogueado.id,
                      activdadTipo.actividad.actividadId
                    )
                    .subscribe((res) => {
                      this.toast.success(
                        `Se inscribió a la evaluación ${activdadTipo.actividad.nombre} correctamente! .`
                      );
                      this.accederAPruebaOnline(activdadTipo.actividad);
                    });
                }
              });
            }
          });
  }

  accederAPruebaOnline = (pruebaOnline: Actividad) => {
    const today = new Date();
    const fecha = new Date(pruebaOnline.fecha);
    const fechaFinalizada = new Date(pruebaOnline.fechaFinalizada);
    console.log('prueba online:: ', pruebaOnline);

    if (today >= fecha && today <= fechaFinalizada) {
      confirmacionUsuario(
        'Confirmacion de usuario',
        `Está por acceder a la prueba online ${pruebaOnline.nombre}, desea continuar?`
      ).then((response) => {
        if (response.isConfirmed) {
          // ir a prueba online

          this.router.navigate(
            [
              `/${this.autenticacionService
                .getRolSesion()
                .toLocaleLowerCase()}/evaluacion-individual`,
            ],
            {
              queryParams: { id: pruebaOnline.actividadId },
              relativeTo: this.route,
            }
          );
        }
      });
    } else if (today > fechaFinalizada) {
      this.toast.error('La prueba online ya no esta habilitada.');
    } else {
      this.toast.error('Aún no está habilitada la prueba online.');
    }
  };

  descargarMaterial = (material: Material) => {
    console.log(material);

    const linkSource = `data:application/pdf;base64,${material.archivoData}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = material.archivoNombre;
    downloadLink.click();
  };

  calificaciones = () =>
    this.dialog.open(MisCalificacionesComponent, {
      height: 'auto',
      width: '100%',
      data: { cursoId: this.cursoId },
    });

  claseVirtual = () => {
    const linkSource =
      this.curso.salaVirtual.includes('http') ||
      this.curso.salaVirtual.includes('https')
        ? this.curso.salaVirtual
        : `http://${this.curso.salaVirtual}`;

    const link = document.createElement('a');
    link.href = linkSource;
    link.target = '_blank';

    link.click();
  };

  abrirZoom = () => {
    if (this.curso.zoomId && this.curso.zoomPassword) {
      localStorage.setItem(
        'queryParams',
        JSON.stringify({
          meetingNumber: this.curso.zoomId, //'99644515024',
          passWord: this.curso.zoomPassword, //'MEg5M3NoMWcrYXFFYkk1WEk2RGVIQT09',
          // es el nombre del alumno o el email
          userName: this.usuarioLogueado.email, //'Angular',
        })
      );

      this.router.navigate(['/zoom']);
    } else {
      errorMensaje(
        'Error',
        'El curso no tiene sala de zoom vinculada, prueba con la sala virtual!'
      ).then();
    }
  };

  verCalendarioActividades = () =>
    this.dialog.open(VistaCalendarioComponent, {
      height: 'auto',
      width: '100%',
      data: { cursoId: this.cursoId },
    });

  gotToForo = (foro: Foro) =>
    this.router.navigate(['/alumno/ver-foro'], {
      queryParams: { id: foro.foroId },
      relativeTo: this.route,
    });

  verComunicados = (curso: Curso) => {
    if(curso.comunicados.length > 0){

      this.dialog.open(VerComunicadosComponent, {
        height: 'auto',
        width: '100%',
        data: { curso },
      });
    } else {
      errorMensaje('No hay comunicados', `No existen comunicados para el curso ${curso.nombre}  ${curso.descripcion}`)
    }
    
  }
}
