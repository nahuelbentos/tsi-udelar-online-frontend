import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Comunicado } from 'src/app/models/Comunicado';
import { ComunicadoCurso } from 'src/app/models/comunicado-curso';
import { ComunicadoFacultad } from 'src/app/models/comunicado-facultad';
import { Curso } from 'src/app/models/curso.model';
import { Facultad } from 'src/app/models/facultad.model';
import { TemplateCurso } from 'src/app/models/template-curso.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ComunicadoService } from 'src/app/services/comunicado.service';
import { CursoService } from 'src/app/services/curso.service';
import { FacultadService } from 'src/app/services/facultad.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { SeleccionarComunicadoComponent } from '../../dialogs/seleccionar-comunicado/seleccionar-comunicado.component';
import { SeleccionarCursoComponent } from '../../dialogs/seleccionar-curso/seleccionar-curso.component';
import { SeleccionarFacultadComponent } from '../../dialogs/seleccionar-facultad/seleccionar-facultad.component';

@Component({
  selector: 'app-abm-publicarcomunicado',
  templateUrl: './abm-publicarcomunicado.component.html',
  styleUrls: ['./abm-publicarcomunicado.component.scss'],
})
export class AbmPublicarcomunicadoComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();
  publicarComunicadoForm: FormGroup;
  comunicadoId: string;
  comunicado: Comunicado;
  filteredComunicados: Observable<Comunicado[]>;
  comunicados: Comunicado[] = [];
  filteredFacultades: Observable<Facultad[]>;
  facultades: Facultad[] = [];
  cursos: Curso[] = [];
  facultad: Facultad;
  curso: Curso;

  primeraVez = false;
  modo: string;
  hide = true;

  @Input() tipo: TipoUsuario = null;

  comunicadoDialog = SeleccionarComunicadoComponent;
  facultadDialog = SeleccionarFacultadComponent;
  cursoDialog = SeleccionarCursoComponent;

  constructor(
    private autenticacionService: AutenticacionService,
    private comunicadoService: ComunicadoService,
    private facultadService: FacultadService,
    private cursoService: CursoService,
    public dialog: MatDialog,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.comunicadoService.getComunicados().subscribe(
      (comunicados) =>
        (this.comunicados = comunicados.map((comunicado) => ({
          ...comunicado,
          descripcionAutocomplete: comunicado.nombre,
        })))
    );

    this.facultadService.getFacultades().subscribe(
      (facultades) =>
        (this.facultades = facultades.map((facultad) => ({
          ...facultad,
          descripcionAutocomplete: facultad.nombre,
        })))
    );

    this.cursoService.getCursos().subscribe(
      (cursos) =>
        (this.cursos = cursos.map((curso) => ({
          ...curso,
          descripcionAutocomplete: curso.nombre,
        })))
    );
  }

  getComunicado(comunicado: Comunicado) {
    console.log('getItem:: ', comunicado);
    this.comunicado = comunicado;
    console.log('this.comunicado:: ', this.comunicado);
  }

  getFacultad(facultad: Facultad) {
    console.log('getItem:: ', facultad);
    this.facultad = facultad;
    console.log('this.facultad:: ', this.facultad);
  }

  getCurso(curso: Curso) {
    console.log('getItem:: ', curso);
    this.curso = curso;
    console.log('this.curso:: ', this.curso);
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.location.back();

  }

  publicarGeneral(event: Event) {
    event.preventDefault();

    const comunicado = new Comunicado(
      this.comunicado.nombre,
      this.comunicado.descripcion,
      this.comunicado.url
    );
    comunicado.comunicadoId = this.comunicado.comunicadoId;
    this.comunicadoService
      .publicarComunicadoGeneral(comunicado)
      .subscribe(() => {
        mensajeConfirmacion(
          'Excelente!',
          `Se publicó comunicado exitosamente.`
        ).then( res =>  this.location.back());

      });
  }

  publicarComunicado(event: Event) {
    event.preventDefault();
    if (this.tipo === 'Administrador') {
      const comunicadoFacultad = new ComunicadoFacultad();
      comunicadoFacultad.comunicadoId = this.comunicado.comunicadoId;
      comunicadoFacultad.facultadId = this.facultad.facultadId;
      console.log('comunicadoFacultad ', comunicadoFacultad);
      this.comunicadoService
        .publicarComunicadoFacultad(comunicadoFacultad)
        .subscribe(() => {
          mensajeConfirmacion(
            'Excelente!',
            `Se publicó comunicado exitosamente.`
          ).then(res => this.location.back());
          
        });
    } else {
      const comunicadoCurso = new ComunicadoCurso();
      comunicadoCurso.comunicadoId = this.comunicado.comunicadoId;
      comunicadoCurso.cursoId = this.curso.cursoId;
      this.comunicadoService
        .publicarComunicadoCurso(comunicadoCurso)
        .subscribe(() => {
          mensajeConfirmacion(
            'Excelente!',
            `Se publicó comunicado exitosamente.`
          ).then( res => this.location.back());
          
        });
    }
  }
}
