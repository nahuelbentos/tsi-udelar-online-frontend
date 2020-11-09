import { Component, OnInit } from '@angular/core';
import { Facultad } from 'src/app/models/facultad.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { FacultadService } from 'src/app/services/facultad.service';

@Component({
  selector: 'app-gestion-facultad',
  templateUrl: './gestion-facultad.component.html',
  styleUrls: ['./gestion-facultad.component.scss']
})
export class GestionFacultadComponent implements OnInit {
  facultades: Facultad[];
  createComponent = false;
  columnas = ['nombre', 'descripcion', 'urlAcceso', 'actions'];

  constructor(private facultadService: FacultadService) {
    this.getFacultades();
  }

  ngOnInit(): void {}

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.facultadService
        .deleteFacultad(data.id)
        .subscribe((res) => this.getFacultades());
    }
  }

  getFacultades() {
    this.facultadService.getFacultades().subscribe((facultades) => {
      this.facultades = facultades.map((facultad) => ({ ...facultad, id: facultad.facultadId }));
      this.createComponent = true;
    });
  }
}
