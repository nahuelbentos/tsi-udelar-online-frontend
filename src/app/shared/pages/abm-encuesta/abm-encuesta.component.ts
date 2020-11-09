import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Encuesta } from 'src/app/models/encuesta.model';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-abm-encuesta',
  templateUrl: './abm-encuesta.component.html',
  styleUrls: ['./abm-encuesta.component.scss']
})
export class AbmEncuestaComponent implements OnInit {
  encuestaForm: FormGroup;
  encuestaId: string;

  get nombre() {
    return this.encuestaForm.get('nombre');
  }
  get descripcion() {
    return this.encuestaForm.get('descripcion');
  }
  get esAdministadorFacultad() {
    return this.encuestaForm.get('esAdministradorFacultad');
  }

  constructor(
    private encuestaService: EncuestaService,
    private fb: FormBuilder,
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
      esAdministradorFacultad: [''],
    });
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.router.navigate(['/administrador/encuesta']);
  }

  guardarEncuesta(event: Event) {
    event.preventDefault();

    if (this.encuestaForm.invalid) {
      return;
    }

    const encuesta = new Encuesta(this.nombre.value);

    encuesta.descripcion = this.descripcion.value;
    encuesta.esAdministradorFacultad = this.esAdministadorFacultad.value;

    this.encuestaService.createEncuesta(encuesta).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el curso ${this.nombre.value} exitosamente.`
      ).then();
      this.router.navigate(['gestion-encuesta']);
    });
  }
}
