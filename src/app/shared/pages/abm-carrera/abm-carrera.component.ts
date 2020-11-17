import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrera } from 'src/app/models/carrera.model';
import { Facultad } from 'src/app/models/facultad.model';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { FacultadService } from 'src/app/services/facultad.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-abm-carrera',
  templateUrl: './abm-carrera.component.html',
  styleUrls: ['./abm-carrera.component.scss'],
})
export class AbmCarreraComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = JSON.parse(
    localStorage.getItem('usuarioSesion')
  );
  carreraForm: FormGroup;
  carreraId: string;

  primeraVez = false;
  modo: string;
  hide = true;

  facultades: Facultad[] = [];

  get nombre() {
    return this.carreraForm.get('nombre');
  }

  get descripcion() {
    return this.carreraForm.get('descripcion');
  }

  get facultad() {
    return this.carreraForm.get('facultad');
  }

  constructor(
    private carreraService: CarreraService,
    private facultadService: FacultadService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.facultadService
      .getFacultades()
      .subscribe((facultades) => (this.facultades = facultades));

    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.carreraId = param.id;

      if (param.id) {
        this.carreraService
          .getCarreraById(this.carreraId)
          .subscribe((carrera) => this.setValuesOnForm(carrera));
      }
    });
  }

  private setValuesOnForm(carrera: Carrera) {
    this.nombre.setValue(carrera.nombre);
    this.descripcion.setValue(carrera.descripcion);
    this.facultad.setValue(carrera.facultad.facultadId);
  }

  private buildForm() {
    this.carreraForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      facultad: ['', Validators.required],
    });
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.router.navigate([
      `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/carrera`,
    ]);
  }

  guardarCarrera(event: Event) {
    event.preventDefault();

    if (this.carreraForm.invalid) {
      return;
    }

    const carrera = new Carrera(this.nombre.value);

    carrera.carreraId = this.carreraId;
    carrera.nombre = this.nombre.value;
    carrera.descripcion = this.descripcion.value;
    carrera.facultadId = this.facultad.value;

    this.modo === 'INS'
      ? this.crearCarrera(carrera)
      : this.editarCarrera(carrera);
  }

  private crearCarrera = (carrera: Carrera) =>
    this.carreraService.createCarrera(carrera).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el carrera ${this.nombre.value} exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/carrera`,
      ]);
    })

  private editarCarrera = (carrera: Carrera) =>
    this.carreraService.updateCarrera(carrera).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se modificó el carrera ${this.nombre.value} exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/carrera`,
      ]);
    })
}
