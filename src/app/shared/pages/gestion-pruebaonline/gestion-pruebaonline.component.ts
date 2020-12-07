import { Component, OnInit } from '@angular/core';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { PruebaOnline } from 'src/app/models/prueba-online.model'  
import { PruebaOnlineService } from 'src/app/services/prueba-online.service';


@Component({
  selector: 'app-gestion-pruebaonline',
  templateUrl: './gestion-pruebaonline.component.html',
  styleUrls: ['./gestion-pruebaonline.component.scss'],
})
export class GestionPruebaonlineComponent implements OnInit {
  pruebasOnline: PruebaOnline[];
  createComponent = false;
  columnas = ['nombre', 'descripcion', 'url', 'actions'];

  constructor(private pruebaOnlineService: PruebaOnlineService) {
    this.getPruebasOnline();
  }

  ngOnInit(): void {}

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.pruebaOnlineService
        .deletePruebaOnline(data.id)
        .subscribe((res) => this.getPruebasOnline());
    }
  }

  getPruebasOnline() {
    this.pruebaOnlineService.getPruebasOnline().subscribe((pruebasOnline) => {
      this.pruebasOnline = pruebasOnline.map((pruebaOnline) => ({
        ...pruebaOnline,
        id: pruebaOnline.actividadId,
      }));
      this.createComponent = true;
    });
  }
}
