import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Facultad } from 'src/app/models/facultad.model';
import { TemplateCurso } from 'src/app/models/template-curso.model';
import { Usuario } from 'src/app/models/usuario.model';
import { FacultadService } from 'src/app/services/facultad.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { Color } from '@angular-material-components/color-picker';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { _MatAutocompleteBase } from '@angular/material/autocomplete';

@Component({
  selector: 'app-abm-facultad',
  templateUrl: './abm-facultad.component.html',
  styleUrls: ['./abm-facultad.component.scss'],
})
export class AbmFacultadComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();
  facultadForm: FormGroup;
  facultadId: string;
  archivoData: string;
  archivoNombre: string;
  archivoExtension: string;

  usuariosLista: Usuario[] = [
    {
      usuarioId: '9F4CA882-B42F-473B-85E9-BEFD1E818B7F',
      nombres: 'Pepito Gonzalez',
    },
  ];
  modo: string;

  get nombre() {
    return this.facultadForm.get('nombre');
  }
  get descripcion() {
    return this.facultadForm.get('descripcion');
  }
  get urlAcceso() {
    return this.facultadForm.get('urlAcceso');
  }

  get dominioMail() {
    return this.facultadForm.get('dominioMail');
  }

  get colorCodigo() {
    return this.facultadForm.get('colorCodigo');
  }

  constructor(
    private autenticacionService: AutenticacionService,
    private facultadService: FacultadService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.facultadId = param.id;

      if (param.id) {
        this.facultadService
          .getFacultadById(this.facultadId)
          .subscribe((facultad) => this.setValuesOnForm(facultad));
      }
    });
  }

  private buildForm() {
    this.facultadForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      urlAcceso: ['', Validators.required],
      dominioMail: ['', Validators.required],
      colorCodigo: ['', Validators.required],
    });
  }

  private setValuesOnForm(facultad: Facultad) {
    this.nombre.setValue(facultad.nombre);
    this.descripcion.setValue(facultad.descripcion);
    this.urlAcceso.setValue(facultad.urlAcceso);
    this.dominioMail.setValue(facultad.dominioMail);
    this.colorCodigo.setValue(facultad.colorCodigo);
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.location.back();
  }
  onUploadClicked(event) {
    console.log('onUploadClicked:: ', event);
  }

   onSelectedFilesChanged(fileList: FileList) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < fileList.length; i++) {
      const file: File = fileList.item(i);
      console.log(file);

      this.archivoNombre = file.name.split('.')[0];
      this.archivoExtension = file.name.split('.')[
        file.name.split('.').length - 1
      ];
      console.log('arcchivoNombre:: ', file.name.split('.')[0]);
      console.log(
        'arcchivoExtension:: ',
        file.name.split('.')[file.name.split('.').length - 1]
      );

      this.getBase64(file.slice());
    }
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // reader.onload = () => (this.archivoData = reader.result.toString());
    reader.onload = () => {
      this.archivoData = reader.result.toString();
    };
    reader.onerror = (error) => console.log('Error: ', error);
  }

  guardarFacultad(event: Event) {
    event.preventDefault();

    if (this.facultadForm.invalid) {
      return;
    }

    const facultad = new Facultad(this.nombre.value);

    facultad.facultadId = this.facultadId;
    facultad.descripcion = this.descripcion.value;
    facultad.urlAcceso = this.urlAcceso.value;
    facultad.dominioMail = this.dominioMail.value;
    facultad.colorCodigo = this.colorCodigo.value.hex;

    if (
      this.usuarioLogueado.facultad.facultadId === facultad.facultadId &&
      this.usuarioLogueado.facultad.colorCodigo !== facultad.colorCodigo
    ) {
      this.usuarioLogueado.facultad.colorCodigo = facultad.colorCodigo;
      this.autenticacionService.setUser(this.usuarioLogueado);
    }

    this.modo === 'INS'
      ? this.crearFacultad(facultad)
      : this.editarFacultad(facultad);
  }

  private crearFacultad = (facultad: Facultad) =>
    this.facultadService.createFacultad(facultad).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el facultad ${this.nombre.value} exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.autenticacionService
          .getRolSesion()
          .toLocaleLowerCase()}/facultad`,
      ]);
    });

  private editarFacultad = (facultad: Facultad) =>
    this.facultadService.updateFacultad(facultad).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se modificó el facultad ${this.nombre.value} exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.autenticacionService
          .getRolSesion()
          .toLocaleLowerCase()}/facultad`,
      ]);
    });
}
