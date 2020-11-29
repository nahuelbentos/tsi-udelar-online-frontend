import { Component, OnInit } from '@angular/core';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { Respuesta } from 'src/app/models/respuesta.model';
import { RespuestaService } from 'src/app/services/respuesta.service';

@Component({
  selector: 'app-gestion-respuesta',
  templateUrl: './gestion-respuesta.component.html',
  styleUrls: ['./gestion-respuesta.component.scss']
})
export class GestionRespuestaComponent implements OnInit {

  respuestas: Respuesta[];
  createComponent = false;
  columnas = ['usuario','mensaje','actions'];

  constructor(private respuestaService : RespuestaService) { 
    this.getRespuestas();
  }

  ngOnInit(): void {
  }

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.respuestaService
        .deleteRespuesta(data.id)
        .subscribe((res) => this.getRespuestas());
    }
  }

  getRespuestas() {
    this.respuestaService.getRespuestas().subscribe((respuestas) => {
      this.respuestas = respuestas.map((respuesta) => ({
        ...respuesta,
        id: respuesta.respuestaId,
      }));
      this.createComponent = true;
    });
  }

}
