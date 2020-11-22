import { Component, OnInit } from '@angular/core';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { Mensaje } from 'src/app/models/mensaje.model';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-gestion-mensaje',
  templateUrl: './gestion-mensaje.component.html',
  styleUrls: ['./gestion-mensaje.component.scss']
})
export class GestionMensajeComponent implements OnInit {

  mensajes: Mensaje[];
  createComponent = false;
  columnas = ['emisor', 'mensaje', 'actions'];

  constructor(private mensajeService: MensajeService) {
    this.getMensajes();
  }

  ngOnInit(): void {
  }

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.mensajeService
        .deleteMensaje(data.id)
        .subscribe((res) => this.getMensajes());
    }
  }

  getMensajes() {
    this.mensajeService.getMensajes().subscribe((mensajes) => {
      this.mensajes = mensajes.map((mensaje) => ({
        ...mensaje,
        id: mensaje.mensajeId,
      }));
      this.createComponent = true;
    });
  }

}
