import { Component, Input, OnInit } from '@angular/core';
import { Actions } from 'src/app/models/actions.model';
import { AlumnoPruebaOnline } from 'src/app/models/alumno-prueba-online.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { PruebaOnlineService } from 'src/app/services/prueba-online.service';

@Component({
  selector: 'app-gestion-alumno-pruebaonline',
  templateUrl: './gestion-alumno-pruebaonline.component.html',
  styleUrls: ['./gestion-alumno-pruebaonline.component.scss']
})
export class GestionAlumnoPruebaonlineComponent implements OnInit {
  @Input() tipoSingular = 'alumnopruebaonline';
  @Input() tituloPlural = 'alumnospruebasonline';

  @Input() alumnosPruebaOnline: AlumnoPruebaOnline[];
  @Input() actions: Actions[] = [];
  @Input() actionsHeader: Actions[] = [];
  @Input() columnas = ['calificacion', 'actions'];

  constructor(private pruebaOnlineService: PruebaOnlineService,) {}

  ngOnInit(): void {
    this.GetAlumnoPruebaOnlineByPruebaOnline();
  }

  onEliminar(data: EliminarRow) {
    // if (data.elimino) {
    //   // Llamamos al backend para eliminar el registro.
    //   this.pruebaOnlineService.deletePruebaOnline
      
    //     .deleteAlumnoCurso(data.id)
    //     .subscribe((res) => this.getAlumnosCurso());
    // }
  }

  GetAlumnoPruebaOnlineByPruebaOnline() {
    // if (!this.alumnosCurso) {
    //   this.pruebaOnlineService.GetAlumnoPruebaOnlineByPruebaOnline(data.id).subscribe((alumnosCurso) => {
    //     this.alumnosCurso = alumnosCurso;
    //   });
    // }
  }
}
