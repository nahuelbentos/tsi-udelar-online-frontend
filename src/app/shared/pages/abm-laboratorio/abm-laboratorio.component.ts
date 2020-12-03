import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from 'src/app/models/actividad.model';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ActividadService } from 'src/app/services/actividad.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';

@Component({
  selector: 'app-abm-laboratorio',
  templateUrl: './abm-laboratorio.component.html',
  styleUrls: ['./abm-laboratorio.component.scss']
})
export class AbmLaboratorioComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();
  fechaEntrega: Date;
  tiempoRestante: Date;
  fechaAux: Date;
  nombreActividad: string;
  archivoData: string;
  archivoNombre: string;
  archivoExtension: string;

  modo: string;
  actividadId: string;
  id: string;
  tipo: TipoUsuario = null;
  
  constructor(
    private autenticacionService: AutenticacionService,
    private location: Location,
    private route: ActivatedRoute,
    private actividadService: ActividadService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.actividadId = param.actividadId;
      this.modo = param.modo;
      this.id = param.id;
      this.tipo = param.tipo;
      console.log("actividadid ngoninit ", this.actividadId);
      console.log("id ngoninit ", this.id);
      console.log("tipo ngoninit ", this.tipo);
      console.log("modo ngoninit ", this.modo);

      if (param.actividadId) {
        this.actividadService
        .getActividadById(this.actividadId)
          .subscribe((actividad) => this.setValues(actividad));
      }
    });
  }

  private setValues(actividad: Actividad) {
    this.fechaEntrega = actividad.fechaFinalizada;
    this.nombreActividad = actividad.nombre;
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

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.location.back();
  }

  guardarTrabajo(event: Event) {
    event.preventDefault();

    const actividad = new Actividad(this.nombreActividad);
    actividad.actividadId = this.actividadId;
    actividad.archivoData = this.archivoData.split(',')[1];
    actividad.archivoNombre = this.archivoNombre;
    actividad.archivoExtension = this.archivoExtension;
    actividad.usuarioId = this.usuarioLogueado.id;
    console.log("this.actividadId ", this.actividadId);
    console.log("actividad ", actividad);
    this.actividadService.altaTrabajo(actividad).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se subió el trabajo ${this.nombreActividad} exitosamente.`
      ).then();
      this.router.navigate([
         `/${this.autenticacionService.getRolSesion().toLocaleLowerCase()}/mis-cursos`,
      ]);
    });
  }
}
