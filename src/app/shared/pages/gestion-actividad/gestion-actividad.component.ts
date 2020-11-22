import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/models/actividad.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-gestion-actividad',
  templateUrl: './gestion-actividad.component.html',
  styleUrls: ['./gestion-actividad.component.scss'],
})
export class GestionActividadComponent implements OnInit {
  actividades: Actividad[];
  createComponent = false;
  columnas = ['nombre', 'descripcion', 'actions'];

  constructor(private actividadService: ActividadService) {
    this.getActividades();
  }

  ngOnInit(): void {}

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.actividadService
        .deleteActividad(data.id)
        .subscribe((res) => this.getActividades());
    }
  }

  getActividades() {
    this.actividadService.getActividades().subscribe((actividades) => {
      this.actividades = actividades.map((actividad) => ({
        ...actividad,
        id: actividad.actividadId,
      }));
      this.createComponent = true;
    });
  }
}
