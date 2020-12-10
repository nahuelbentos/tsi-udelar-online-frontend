import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from 'src/app/models/actions.model';
import { Actividad } from 'src/app/models/actividad.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-gestion-calses-dictadas',
  templateUrl: './gestion-calses-dictadas.component.html',
  styleUrls: ['./gestion-calses-dictadas.component.scss'],
})
export class GestionCalsesDictadasComponent implements OnInit {
  clasesDictadas: Actividad[];
  columnas = ['nombre', 'descripcion', 'actions'];

  @Input() actionsHeader: Actions[] = null; //[{}];
  constructor(
    private actividadService: ActividadService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getClasesDictadas();
  }

  ngOnInit(): void {
    this.actionsHeader = [
      {
        tooltip: `Agregar clase dictada`,
        callback: this.onAgregar,
        tooltipClassName: 'tooltip-blue',
        title: `Agregar clase dictada`,
      },
    ];
  }

  onAgregar = () =>
    this.router.navigate([`abm-clasedictada`], {
      queryParams: { modo: 'INS', tipo: 'ClaseDictada' },
      relativeTo: this.route,
    });

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      // Llamamos al backend para eliminar el registro.
      this.actividadService
        .deleteActividad(data.id)
        .subscribe((res) => this.getClasesDictadas());
    }
  }

  getClasesDictadas() {
    this.actividadService
      .getActividadesByTipo('ClaseDictada')
      .subscribe((actividades) => {
        this.clasesDictadas = actividades.map((claseDictada) => ({
          ...claseDictada,
          id: claseDictada.actividadId,
        }));
      });
  }
}
