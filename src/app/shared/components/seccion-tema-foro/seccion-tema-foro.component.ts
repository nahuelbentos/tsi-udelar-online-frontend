import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TemaForo } from 'src/app/models/tema-foro.model';
import { AbmMensajetemaComponent } from '../../pages/abm-mensajetema/abm-mensajetema.component';
import { ResponderTemaForoComponent } from '../responder-tema-foro/responder-tema-foro.component';

import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'app-seccion-tema-foro',
  templateUrl: './seccion-tema-foro.component.html',
  styleUrls: ['./seccion-tema-foro.component.scss'],
})
export class SeccionTemaForoComponent implements OnInit, OnChanges {
  @Input() temaForo: TemaForo;
  @Output() huboRespuesta: EventEmitter<any> = new EventEmitter();

  fechaString: string;
  constructor(private dialog: MatDialog) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.temaForo.currentValue) {
      this.temaForo = changes.temaForo.currentValue;
      
      this.fechaString = moment(this.temaForo.fechaCreado).format('LLL').toString();
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
}
