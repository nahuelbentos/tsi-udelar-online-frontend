import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from 'src/app/models/actividad.model';
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
    actividad.preguntaLista.forEach((pregunta) => this.preguntas.push(new FormControl(pregunta.texto)));
  }
  private buildForm() {
    this.encuestaForm = this.fb.group({
      respuestas: ['', Validators.required],
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
    encuesta.preguntaLista.res
    encuesta.usuarioId = this.usuarioSesion.id;
    encuesta.actividadId = this.encuestaId;
    }

  editarEncuesta(encuesta) {
    this.actividadService.editEncuesta(encuesta).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se modificó la encuesta ${this.nombre.value} exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.auth
          .getRolSesion()
          .toLocaleLowerCase()}/encuesta`,
      ]);
    });
  };
}
