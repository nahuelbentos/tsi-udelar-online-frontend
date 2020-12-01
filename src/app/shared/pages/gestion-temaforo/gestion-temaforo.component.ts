import { Component, OnInit } from '@angular/core';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { TemaForo } from 'src/app/models/tema-foro.model';
import { TemaForoService } from 'src/app/services/tema-foro.service';

@Component({
  selector: 'app-gestion-temaforo',
  templateUrl: './gestion-temaforo.component.html',
  styleUrls: ['./gestion-temaforo.component.scss']
})
export class GestionTemaforoComponent implements OnInit {

  temasForo: TemaForo[];
  createComponent = false;
  columnas = ['asunto', 'mensaje', 'actions'];

  constructor(private temaForoService: TemaForoService) {
    this.getTemasForo();
  }

  ngOnInit(): void {
  }

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.temaForoService
        .deleteTemaForo(data.id)
        .subscribe((res) => this.getTemasForo());
    }
  }

  getTemasForo() {
    this.temaForoService.getTemasForo().subscribe((temasForo) => {
      this.temasForo = temasForo.map((temaForo) => ({
        ...temaForo,
        id: temaForo.temaForoId,
      }));
      this.createComponent = true;
    });
  }

}

