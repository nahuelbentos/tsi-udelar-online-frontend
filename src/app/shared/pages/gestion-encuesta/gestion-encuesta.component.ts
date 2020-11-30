import { Component, Input, OnInit } from '@angular/core';
import { Actividad } from 'src/app/models/actividad.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-gestion-encuesta',
  templateUrl: './gestion-encuesta.component.html',
  styleUrls: ['./gestion-encuesta.component.scss']
})
export class GestionEncuestaComponent implements OnInit {
  encuestas: Actividad[];
  createComponent = false;
  columnas = ['nombre', 'descripcion', 'actions'];
  @Input() tipo: TipoUsuario;
  @Input() actions = null; //[{}];
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
    this.actividadService.getActividadesByTipo('Encuesta').subscribe((actividades) => {
      this.encuestas = actividades.map((encuesta) => ({
        ...encuesta,
        id: encuesta.actividadId,
      }));
      this.createComponent = true;
    });
  }
}
