import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TemaForo } from 'src/app/models/tema-foro.model';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { TemaForoService } from 'src/app/services/tema-foro.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { Location } from '@angular/common';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ForoService } from 'src/app/services/foro.service';
import { Foro } from 'src/app/models/foro.model';

@Component({
  selector: 'app-abm-temaforo',
  templateUrl: './abm-temaforo.component.html',
  styleUrls: ['./abm-temaforo.component.scss'],
})
export class AbmTemaForoComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = JSON.parse(
    localStorage.getItem('usuarioSesion')
  );
  temaForoForm: FormGroup;
  temaForoId: string;
  foroId: string;
  tituloForo: string;
  descripcionForo: string;
  usuarioSesion = this.auth.getUser();


  archivoData: string;
  archivoNombre: string;
  archivoExtension: string;

  get asunto() {
    return this.temaForoForm.get('asunto');
  }
  get mensaje() {
    return this.temaForoForm.get('mensaje');
  }
  get file() {
    return this.temaForoForm.get('file');
  }
  get subrscripcionADiscusion() {
    return this.temaForoForm.get('subrscripcionADiscusion');
  }

  constructor(
    private foroService: ForoService,
    private temaForoService: TemaForoService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private auth: AutenticacionService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      console.log(param)
      this.temaForoId = param.temaForoid;
      this.foroId = param.foroId;
      this.tituloForo = param.titulo;
      this.descripcionForo = param.descripcion;

      if (param.temaForoId) {
        this.temaForoService
          .getTemaForoById(this.temaForoId)
          .subscribe((temaForo) => this.setValuesOnForm(temaForo));
      }
    });
  }

  private setValuesOnForm(temaForo: TemaForo) {
    this.asunto.setValue(temaForo.asunto);
    this.file.setValue(temaForo.archivoNombre);
    this.mensaje.setValue(temaForo.mensaje);
    this.subrscripcionADiscusion.setValue(temaForo.subscripcionADiscusion);
  }

  private buildForm() {
    this.temaForoForm = this.fb.group({
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required],
      subrscripcionADiscusion: [false],
    });
  }

  onNoClick(): void {
    this.router.navigate([`/${this.usuarioSesion.tipo.toLocaleLowerCase()}/ver-foro`],
    {
      queryParams: {id: this.foroId },
      relativeTo: this.route,
    });
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

  guardarTemaForo(event: Event) {
    event.preventDefault();

    if (this.temaForoForm.invalid) {
      return;
    }

    const temaforo = new TemaForo();

    temaforo.asunto = this.asunto.value;
    temaforo.mensaje = this.mensaje.value;
    if (this.archivoData) { temaforo.archivoData = this.archivoData.split(',')[1]; }
    temaforo.archivoNombre = this.archivoNombre;
    temaforo.archivoExtension = this.archivoExtension;
    temaforo.emisorId = this.usuarioLogueado.id;
    temaforo.subscripcionADiscusion = this.subrscripcionADiscusion.value;

    const foro = new Foro();

    foro.foroId = this.foroId;
    foro.temaForoLista = [temaforo]; //FIXME
    foro.descripcion = this.descripcionForo;
    foro.titulo = this.tituloForo;

    this.foroService.updateForo(foro).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el temaforo ${this.asunto.value} exitosamente.`
      ).then();

      this.router.navigate([`/${this.usuarioSesion.tipo.toLocaleLowerCase()}/ver-foro`],
      {
        queryParams: {id: this.foroId },
        relativeTo: this.route,
      });
    });
  }

  editarTemaForo(temaForo: TemaForo) {
    this.temaForoService.updateTemaForo(temaForo).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se editó el tema foro ${this.asunto.value} exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/temaforo`,
      ]);
    });
  }

}
