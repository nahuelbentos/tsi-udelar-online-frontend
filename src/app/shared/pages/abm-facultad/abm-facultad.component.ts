import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Facultad } from 'src/app/models/facultad.model';
import { TemplateCurso } from 'src/app/models/template-curso.model';
import { Usuario } from 'src/app/models/usuario.model';
import { FacultadService } from 'src/app/services/facultad.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { Color } from '@angular-material-components/color-picker';


@Component({
  selector: 'app-abm-facultad',
  templateUrl: './abm-facultad.component.html',
  styleUrls: ['./abm-facultad.component.scss'],
})
export class AbmFacultadComponent implements OnInit {
  facultadForm: FormGroup;
  facultadId: string;

  usuariosLista: Usuario[] = [
    {
      usuarioId: '9F4CA882-B42F-473B-85E9-BEFD1E818B7F',
      nombres: 'Pepito Gonzalez',
    },
  ];

  get nombre() {
    return this.facultadForm.get('nombre');
  }
  get descripcion() {
    return this.facultadForm.get('descripcion');
  }
  get urlAcceso() {
    return this.facultadForm.get('urlAcceso');
  }
  get fechaNacimiento() {
    return this.facultadForm.get('fechaNacimiento');
  }
  get dominioMail() {
    return this.facultadForm.get('dominioMail');
  }
  get usuarioLista() {
    return this.facultadForm.get('usuarioLista');
  }
  get colorPrincipal() {
    return this.facultadForm.get('colorCtr');
  }

  constructor(
    private facultadService: FacultadService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {

  }

  private buildForm() {
    this.facultadForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      urlAcceso: ['', Validators.required],
      dominioMail: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      usuarioLista: [''],
      colorCtr: ['', Validators.required],
    });
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    console.log(this.facultadForm)
    this.router.navigate(['/administrador/facultad']);
  }

  guardarFacultad(event: Event) {
    event.preventDefault();

    if (this.facultadForm.invalid) {
      return;
    }

    const facultad = new Facultad(this.nombre.value);

    facultad.descripcion = this.descripcion.value;
    facultad.urlAcceso = this.urlAcceso.value;
    facultad.fechaNacimiento = this.fechaNacimiento.value;
    facultad.dominioMail = this.dominioMail.value;
    facultad.usuarioLista = this.usuarioLista.value;
    facultad.colorPrincipal = this.colorPrincipal.value.hex;

    this.facultadService.createFacultad(facultad).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el curso ${this.nombre.value} exitosamente.`
      ).then();
      this.router.navigate(['gestion-facultad']);
    });
  }
}
