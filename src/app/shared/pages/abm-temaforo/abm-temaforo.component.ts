import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TemaForo } from 'src/app/models/tema-foro.model';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { TemaForoService } from 'src/app/services/tema-foro.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-abm-temaforo',
  templateUrl: './abm-temaforo.component.html',
  styleUrls: ['./abm-temaforo.component.scss']
})
export class AbmTemaForoComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = JSON.parse(
    localStorage.getItem('usuarioSesion')
  );
  temaForoForm: FormGroup;
  temaForoId: string;


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
    private temaForoService: TemaForoService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.temaForoId = param.id;

      if (param.id) {
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
      file: ['', Validators.required], 
      subrscripcionADiscusion: [false],
    });
  }

  onNoClick(): void {
    this.router.navigate([
      `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/temaforo`,
    ]);
  }

  guardarTemaForo(event: Event) {
    event.preventDefault();

    if (this.temaForoForm.invalid) {
      return;
    }

    const temaforo = new TemaForo(this.mensaje.value);

    temaforo.asunto = this.asunto.value;
    temaforo.mensaje = this.mensaje.value;
    temaforo.archivoData = this.file.value;
    temaforo.archivoExtension = this.file.value;
    temaforo.archivoNombre = this.file.value;
    temaforo.emisorId = this.usuarioLogueado.id;
    temaforo.subscripcionADiscusion = this.subrscripcionADiscusion.value;

    this.temaForoService.createTemaForo(temaforo).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el temaforo ${this.asunto.value} exitosamente.`
      ).then();
      this.router.navigate(['gestion-temaforo']);
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
