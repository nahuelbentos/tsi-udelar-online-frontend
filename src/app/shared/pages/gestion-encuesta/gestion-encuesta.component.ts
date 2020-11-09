import { Component, OnInit } from '@angular/core';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { Encuesta } from 'src/app/models/encuesta.model';
import { EncuestaService } from 'src/app/services/encuesta.service';

@Component({
  selector: 'app-gestion-encuesta',
  templateUrl: './gestion-encuesta.component.html',
  styleUrls: ['./gestion-encuesta.component.scss']
})
export class GestionEncuestaComponent implements OnInit {
  encuestas: Encuesta[];
  createComponent = false;
  columnas = ['nombre', 'descripcion', 'actions'];

  constructor(private encuestaService: EncuestaService) {
    this.getEncuestas();
  }

  ngOnInit(): void {}

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.encuestaService
        .deleteEncuesta(data.id)
        .subscribe((res) => this.getEncuestas());
    }
  }

  getEncuestas() {
    this.encuestaService.getEncuestas().subscribe((encuestas) => {
      this.encuestas = encuestas.map((encuesta) => ({ ...encuesta, id: encuesta.encuestaId }));
      this.createComponent = true;
    });
  }
}
