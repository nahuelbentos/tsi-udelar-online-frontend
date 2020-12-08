import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Actions } from 'src/app/models/actions.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { Seccion } from 'src/app/models/seccion.model';

import { SeccionService } from 'src/app/services/seccion.service';

@Component({
  selector: 'app-gestion-seccion',
  templateUrl: './gestion-seccion.component.html',
  styleUrls: ['./gestion-seccion.component.scss'],
})
export class GestionSeccionComponent implements OnInit, OnChanges {
  @Input() secciones: Seccion[];
  columnas = ['nombre', 'descripcion', 'actions'];
  @Input() actions: Actions[];
  @Input() actionsHeader: Actions[];

  constructor( private seccionService: SeccionService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
    if(changes.secciones && changes.secciones.currentValue){
      this.secciones = changes.secciones.currentValue;
    } else {
     this.getSecciones();
    }

  }

  ngOnInit(): void { 
     this.getSecciones();
    }

  onEliminar(data: EliminarRow) {
    if (data.elimino) { 
      // Llamamos al backend para eliminar el registro.
      this.seccionService
        .deleteSeccion(data.id)
        .subscribe((res) => this.getSecciones());
    }
  }

  getSecciones() {
    this.seccionService.getSecciones().subscribe((secciones) => {
      this.secciones = secciones.map((seccion) => ({
        ...seccion,
        id: seccion.seccionId,
      })); 
    });
  }

}
