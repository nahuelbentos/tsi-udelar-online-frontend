import { Location } from '@angular/common';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoSeccion } from 'src/app/models/curso-seccion';
import { Material } from 'src/app/models/material.model';
import { Seccion } from 'src/app/models/seccion.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CursoSeccionService } from 'src/app/services/curso-seccion.service';
import { MaterialService } from 'src/app/services/material.service';
import { SeccionService } from 'src/app/services/seccion.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { SeleccionarSeccionComponent } from '../../dialogs/seleccionar-seccion/seleccionar-seccion.component';

@Component({
  selector: 'app-abm-material',
  templateUrl: './abm-material.component.html',
  styleUrls: ['./abm-material.component.scss'],
})
export class AbmMaterialComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();
  
  materialForm: FormGroup;
  materialId: string;

  archivoData: string;
  archivoNombre: string;
  archivoExtension: string;

  primeraVez = false;
  modo: string;
  hide = true;

  secciones: Seccion[] = [];
  seccion: Seccion;
  seccionDialog =  SeleccionarSeccionComponent;
  cursoId: string;
  tipo: TipoUsuario = null;
  

  get nombre() {
    return this.materialForm.get('nombre');
  }

  get descripcion() {
    return this.materialForm.get('descripcion');
  }

  get facultad() {
    return this.materialForm.get('facultad');
  }
  
  constructor(
    private autenticacionService: AutenticacionService,
    private cursoSeccionService: CursoSeccionService,
    private seccionService: SeccionService,
    private materialService: MaterialService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.buildForm();
  }


  ngOnInit(): void {
    this.seccionService.getSecciones().subscribe(
      (secciones) =>
        (this.secciones = secciones.map((seccion) => ({
          ...seccion,
          descripcionAutocomplete: seccion.nombre,
        })))
    );

    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.materialId = param.id;
      this.tipo = param.tipo;
      this.cursoId = param.cursoId;

      if (param.id) {
        this.materialService
          .getMaterialById(this.materialId)
          .subscribe((material) => this.setValuesOnForm(material));
      }
    });
  }

  getSeccion(seccion: Seccion) {
    console.log('getItem:: ', seccion);
    this.seccion = seccion;
    console.log('this.comunicado:: ', this.seccion);
  }

  private setValuesOnForm(material: Material) {
    this.nombre.setValue(material.nombre);
    this.descripcion.setValue(material.descripcion);
  }

  private buildForm() {
    this.materialForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.location.back();
  }
  onUploadClicked(event) {
    console.log('onUploadClicked:: ', event);
  }

  async onSelectedFilesChanged(fileList: FileList) {
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

  guardarMaterial(event: Event) {
    event.preventDefault();

    if (this.materialForm.invalid) {
      return;
    }

    const material = new Material(this.nombre.value);

    material.materialId = this.materialId;
    material.nombre = this.nombre.value;
    material.descripcion = this.descripcion.value;
    material.archivoData = this.archivoData.split(',')[1];
    material.archivoNombre = this.archivoNombre;
    material.archivoExtension = this.archivoExtension;
    material.cursoId = this.cursoId;
    material.seccionId = this.seccion.seccionId;
    console.log("material ", material);
    
    this.modo === 'INS'
      ? this.creMaterial(material)
      : this.editMaterial(material);

    // if (this.tipo === TipoUsuario.Docente){
    //   const cursoSeccion = new CursoSeccion();
    //   cursoSeccion.cursoId = this.cursoId;
    //   cursoSeccion.seccionId = this.seccion.seccionId;
    //   console.log("cursoSeccion ", cursoSeccion);
    //   //this.cursoSeccionService.altaCursoSeccion(cursoSeccion);
    // }
  }

  private creMaterial = (material: Material) =>
    {if (this.tipo === TipoUsuario.Docente){
      this.materialService.altaMaterialCursoSeccion(material).subscribe(() => {
        mensajeConfirmacion(
          'Excelente!',
          `Se creó el material ${this.nombre.value} exitosamente.`
        ).then();
        this.router.navigate([
          `/${this.autenticacionService
            .getRolSesion()
            .toLocaleLowerCase()}/curso`,
        ]);
      });
    }else{
      this.materialService.createMaterial(material).subscribe(() => {
        mensajeConfirmacion(
          'Excelente!',
          `Se creó el material ${this.nombre.value} exitosamente.`
        ).then();
        this.router.navigate([
          `/${this.autenticacionService
            .getRolSesion()
            .toLocaleLowerCase()}/curso`,
        ]);
      });
    }}

  private editMaterial = (material: Material) =>
    this.materialService.updateMaterial(material).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se modificó el material ${this.nombre.value} exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.autenticacionService
          .getRolSesion()
          .toLocaleLowerCase()}/curso`,
      ]);
    })
}
