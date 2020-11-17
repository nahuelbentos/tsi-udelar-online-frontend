import { Component, OnInit } from '@angular/core';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { Seccion } from 'src/app/models/seccion.model';

import { SeccionService } from 'src/app/services/seccion.service';

@Component({
  selector: 'app-gestion-seccion',
  templateUrl: './gestion-seccion.component.html',
  styleUrls: ['./gestion-seccion.component.scss'],
})
export class GestionSeccionComponent implements OnInit {
  secciones: Seccion[];
  createComponent = false;
  columnas = ['nombre', 'descripcion', 'actions'];

  constructor(private seccionService: SeccionService) {
    this.getSecciones();
  }

  ngOnInit(): void {}

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.seccionService
        .deleteSeccion(data.id)
        .subscribe((res) => this.getSecciones());
    }
  }

  getSecciones() {
    this.seccionService.getSecciones().subscribe((secciones) => {
      this.secciones = secciones.map((seccion) => ({ ...seccion, id: seccion.seccionId }));
      this.createComponent = true;
    });
  }
}
