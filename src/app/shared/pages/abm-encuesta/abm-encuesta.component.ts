import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from 'src/app/models/actividad.model';
import { ActividadService } from 'src/app/services/actividad.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { Location } from '@angular/common';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-abm-encuesta',
  templateUrl: './abm-encuesta.component.html',
  styleUrls: ['./abm-encuesta.component.scss']
})
export class AbmEncuestaComponent implements OnInit {
  encuestaForm: FormGroup;
  encuestaId: string;
  preguntas: FormControl[] = [];
  modo: string;
  usuarioSesion = this.auth.getUser();
  get nombre() {
    return this.encuestaForm.get('nombre');
  }
  get descripcion() {
    return this.encuestaForm.get('descripcion');
  }

  constructor(
    private actividadService: ActividadService,
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AutenticacionService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.encuestaId = param.id;

      if (param.id) {
        this.actividadService
          .getEncuestaById(this.encuestaId)
          .subscribe((encuesta) => this.setValuesOnForm(encuesta));
      }
    });
  }

  private setValuesOnForm(actividad: Actividad) {
    this.nombre.setValue(actividad.nombre);
    this.descripcion.setValue(actividad.descripcion);
    actividad.preguntaLista.forEach((pregunta) => this.preguntas.push(new FormControl(pregunta.texto)));
  }
  private buildForm() {
    this.encuestaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto

    this.location.back();
  }

  agregarPregunta() {
    this.preguntas.push(new FormControl(''));
  }

  guardarEncuesta(event: Event) {
    event.preventDefault();

    if (this.encuestaForm.invalid) {
      return;
    }

    const encuesta = new Actividad(this.nombre.value);
    encuesta.tipo = 'Encuesta';
    encuesta.descripcion = this.descripcion.value;
    encuesta.preguntaLista = this.preguntas.map((control) => control.value);
    encuesta.usuarioId = this.usuarioSesion.id;
    encuesta.actividadId = this.encuestaId;
    this.modo === 'INS'
      ? this.crearEncuesta(encuesta)
      : this.editarEncuesta(encuesta);
    }

    crearEncuesta(encuesta) {
      this.actividadService.createEncuesta(encuesta).subscribe(() => {
        mensajeConfirmacion(
          'Excelente!',
          `Se creó la encuesta ${this.nombre.value} exitosamente.`
        ).then( res =>  this.location.back());
         
      });
    };

  editarEncuesta(encuesta) {
    this.actividadService.editEncuesta(encuesta).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se modificó la encuesta ${this.nombre.value} exitosamente.`
      ).then( res =>     this.location.back());
     
    });
  };
}
