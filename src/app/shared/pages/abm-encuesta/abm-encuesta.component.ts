import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from 'src/app/models/actividad.model';
import { ActividadService } from 'src/app/services/actividad.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { Location } from '@angular/common';

@Component({
  selector: 'app-abm-encuesta',
  templateUrl: './abm-encuesta.component.html',
  styleUrls: ['./abm-encuesta.component.scss']
})
export class AbmEncuestaComponent implements OnInit {
  encuestaForm: FormGroup;
  encuestaId: string;
  preguntas: FormControl[] = [];

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
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {

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

    encuesta.descripcion = this.descripcion.value;
    encuesta.preguntas = this.preguntas.map((control) => control.value);

    this.actividadService.createActividad(encuesta).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó la encuesta ${this.nombre.value} exitosamente.`
      ).then();
      this.router.navigate(['gestion-encuesta']);
    });
  }
}
