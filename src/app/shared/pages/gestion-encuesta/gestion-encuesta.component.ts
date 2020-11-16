import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/models/actividad.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
<<<<<<< HEAD
import { Encuesta } from 'src/app/models/encuesta.model';
import { ActividadService } from 'src/app/services/actividad.service';

=======
import { ActividadService } from 'src/app/services/actividad.service';
>>>>>>> ABM-facultad-encuesta

@Component({
  selector: 'app-gestion-encuesta',
  templateUrl: './gestion-encuesta.component.html',
  styleUrls: ['./gestion-encuesta.component.scss']
})
export class GestionEncuestaComponent implements OnInit {
  encuestas: Actividad[];
  createComponent = false;
  columnas = ['nombre', 'descripcion', 'actions'];

  constructor(private actividadService: ActividadService) {
    this.getEncuestas();
  }

  ngOnInit(): void {}

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.actividadService
        .deleteActividad(data.id)
        .subscribe((res) => this.getEncuestas());
    }
  }

  getEncuestas() {
<<<<<<< HEAD

    // Falta agregarle un parametro que sea Tipo => Lo estaba viendo chaba a esto me parece.
    this.actividadService.getActividades().subscribe((encuestas) => {
      this.encuestas = encuestas.map((encuesta) => ({ ...encuesta, id: encuesta.actividadId }));
=======
    this.actividadService.getActividades().subscribe((actividades) => {
      actividades.forEach((actividad) => {
        if (actividad.tipo === 'encuesta') {
          this.encuestas.push(actividad);
        }
      });
>>>>>>> ABM-facultad-encuesta
      this.createComponent = true;
    });
  }
}
