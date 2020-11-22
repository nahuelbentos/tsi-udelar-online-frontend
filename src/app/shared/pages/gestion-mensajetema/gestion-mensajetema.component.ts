import { Component, OnInit } from '@angular/core';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { MensajeTema } from 'src/app/models/mensajeTema';
import { MensajetemaService } from 'src/app/services/mensajetema.service';

@Component({
  selector: 'app-gestion-mensajetema',
  templateUrl: './gestion-mensajetema.component.html',
  styleUrls: ['./gestion-mensajetema.component.scss']
})
export class GestionMensajetemaComponent implements OnInit {
  mensajesTema: MensajeTema[];
  createComponent = false;
  columnas = ['contenido', 'actions'];

  constructor(private mensajeTemaService: MensajetemaService) {
    this.getMensajesTemas();
  }

  ngOnInit(): void {}

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.mensajeTemaService.deleteMensajeTema(data.id)
        .subscribe((res) => this.getMensajesTemas());
    }
  }

  getMensajesTemas() {
    this.mensajeTemaService.getMensajesTema().subscribe((mensajesTema) => {
      this.mensajesTema = mensajesTema.map((mensajeTema) => ({ ...mensajeTema, id: mensajeTema.mensajeTemaId }));
      this.createComponent = true;
    });
  }
}
