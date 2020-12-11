import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from 'src/app/models/actions.model';
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

  actions: Actions[];
  constructor(private foroService: ForoService, private router: Router, private route: ActivatedRoute) {
    this.getForos();
  }

  ngOnInit(): void {
    this.actions = [
      {
        tooltip: `Editar foro`,
        mode: 'UPD',
        className: 'button-editar',
        tooltipClassName: 'tooltip-blue',
        icon: 'edit',
      },
      {
        tooltip: `Eliminar foro`,
        mode: 'DLT',
        className: 'button-eliminar',
        tooltipClassName: 'tooltip-red',
        icon: 'delete',
      },
      {
        tooltip: `Ver Foro `,
        callback: this.verForo,
        backgroundColor: '#90caf9',
        icon: 'forum',
      },
    ];
  }

  verForo = (foro: Foro) => {
    
    this.router.navigate([`ver-foro`], {
      queryParams: { id: foro.foroId },
      relativeTo: this.route,
    });
  };

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.foroService.deleteForo(data.id).subscribe((res) => this.getForos());
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
