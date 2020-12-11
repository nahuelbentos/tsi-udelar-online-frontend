import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad, Pregunta } from 'src/app/models/actividad.model';
import { ActividadService } from 'src/app/services/actividad.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { Location } from '@angular/common';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-responder-encuesta',
  templateUrl: './responder-encuesta.component.html',
  styleUrls: ['./responder-encuesta.component.scss']
})
export class ResponderEncuestaComponent implements OnInit {
  encuestaForm: FormGroup;
  encuestaId: string;
  respuestas: FormGroup[] = [];
  preguntas: Pregunta[] = [];
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
    actividad.preguntaLista.forEach((pregunta) =>{
      const group = this.fb.group({
        [pregunta.preguntaId]: [''],
      });
      console.log('group:: ', group);

      this.respuestas.push(group);
    }

    );
    this.preguntas = actividad.preguntaLista.map( pregunta => pregunta);
  }
  private buildForm() {
    this.encuestaForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
    });
  }

  getPregunta(respuesta: FormControl) {
    const id = Object.keys(respuesta.value)[0];
     return this.preguntas.find( pregunta => pregunta.preguntaId === id).texto;

  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto

    this.location.back();
  }

  guardarEncuesta(event: Event) {
    event.preventDefault();
    console.log('invalidL ', this.encuestaForm.invalid);



    const encuesta = new Actividad(this.nombre.value);
    encuesta.tipo = 'Encuesta';
    encuesta.descripcion = this.descripcion.value;
    // this.preguntas.forEach( pregunta => console.log(pregunta.value)
    // )

    // encuesta.preguntaLista = this.preguntas.map((preguntaControl) => preguntaControl.value.respuestaLista.push(this.encuestaForm.value.map((respuesta) => respuesta)) );
    encuesta.usuarioId = this.usuarioSesion.id;
    encuesta.actividadId = this.encuestaId;
    }

  editarEncuesta(encuesta) {
    this.actividadService.editEncuesta(encuesta).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se envió la encuesta ${this.nombre.value} exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.auth
          .getRolSesion()
          .toLocaleLowerCase()}/encuesta`,
      ]);
    });
  };
}
