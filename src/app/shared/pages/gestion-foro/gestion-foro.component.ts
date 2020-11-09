import { Component, OnInit } from '@angular/core';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { Foro } from 'src/app/models/foro.model';
import { ForoService } from 'src/app/services/foro.service';

@Component({
  selector: 'app-gestion-foro',
  templateUrl: './gestion-foro.component.html',
  styleUrls: ['./gestion-foro.component.scss'],
})
export class GestionForoComponent implements OnInit {

  foros: Foro[];
  createComponent = false;
  columnas = ['titulo', 'descripcion', 'actions'];

  constructor(private foroService: ForoService) {
    this.getForos();
  }

  ngOnInit(): void {}

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.foroService
        .deleteForo(data.id)
        .subscribe((res) => this.getForos());
    }
  }

  getForos() {
    this.foroService.getForos().subscribe((foros) => {
      this.foros = foros.map((foro) => ({
        ...foro,
        id: foro.foroId,
      }));
      this.createComponent = true;
    });
  }
}
