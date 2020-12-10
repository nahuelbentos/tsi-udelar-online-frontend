import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Actions } from 'src/app/models/actions.model';
import { Actividad } from 'src/app/models/actividad.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { ActividadService } from 'src/app/services/actividad.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-gestion-actividad',
  templateUrl: './gestion-actividad.component.html',
  styleUrls: ['./gestion-actividad.component.scss'],
})
export class GestionActividadComponent implements OnInit, OnChanges {
  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();
  actividades: Actividad[];
  columnas = ['nombre', 'descripcion', 'actions'];
  @Input() actionsHeader: Actions[] = [];
  @Input() tipoSingular = 'actividad';
  actions: Actions[] = null;

  constructor(
    private actividadService: ActividadService,
    private autenticacionService: AutenticacionService
  ) {
    if (this.usuarioLogueado.rol === 'Docente') {
      this.getActividadesByTipo();
    } else {
      this.getActividades();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.actionsHeader && changes.actionsHeader.currentValue) {
      this.actionsHeader = changes.actionsHeader.currentValue;
    }
  }

  ngOnInit(): void {}

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
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
    });
  }

  getActividadesByTipo() {
    this.actividadService
      .getActividadesByTipo('Trabajo')
      .subscribe((actividades) => {
        this.actividades = actividades.map((actividad) => ({
          ...actividad,
          id: actividad.actividadId,
        }));
      });
  }
}
