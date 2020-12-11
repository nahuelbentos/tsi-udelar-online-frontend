import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MensajeTema } from 'src/app/models/mensajeTema';
import { TemaForo } from 'src/app/models/tema-foro.model';
import { MensajetemaService } from 'src/app/services/mensajetema.service';
import { TemaForoService } from 'src/app/services/tema-foro.service';
import { ResponderTemaForoComponent } from '../responder-tema-foro/responder-tema-foro.component';

import * as moment from 'moment';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
moment.locale('es');

@Component({
  selector: 'app-seccion-respuesta-tema-foro',
  templateUrl: './seccion-respuesta-tema-foro.component.html',
  styleUrls: ['./seccion-respuesta-tema-foro.component.scss'],
})
export class SeccionRespuestaTemaForoComponent implements OnInit {
  @Input() temaForo: TemaForo;
  @Input() respuesta: MensajeTema;
  @Output() huboRespuesta: EventEmitter<any> = new EventEmitter();

  fechaString: string;

  usuarioLoguado: UsuarioSesion = this.auth.getUser();
  verBloquear = this.usuarioLoguado.tipo === TipoUsuario.Docente;

  constructor(
    private dialog: MatDialog,
    private temaForoService: TemaForoService,
    private auth: AutenticacionService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.temaForo && changes.temaForo.currentValue) {
      this.temaForo = changes.temaForo.currentValue;
    }
    if (changes.respuesta.currentValue) {
      this.respuesta = changes.respuesta.currentValue;
      this.fechaString = moment(this.respuesta.fechaDeEnviado)
        .format('LLL')
        .toString();
      console.log('fechaString:: ', this.fechaString);
    }
  }

  ngOnInit(): void {}

  responder = () => {
    const ref = this.dialog.open(ResponderTemaForoComponent, {
      width: '50%',
      height: 'auto',
      data: {
        temaForoId: this.temaForo.temaForoId,
        foroId: this.temaForo.foroId,
        titulo: `RE: ${this.temaForo.asunto}`,
      },
    });

    ref.afterClosed().subscribe(() => this.huboRespuesta.emit(true));
  };

  bloquear = () => {
    this.respuesta.mensajeBloqueado = true;
    this.temaForoService
      .bloquearMensaje(this.respuesta)
      .subscribe(() =>
        mensajeConfirmacion(
          'Excelente!',
          `Se bloqueo la respuesta exitosamente.`
        ).then(() => this.huboRespuesta.emit(true))
      );
  };
}
