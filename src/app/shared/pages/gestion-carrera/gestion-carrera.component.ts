import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { CarreraService } from 'src/app/services/carrera.service';

@Component({
  selector: 'app-gestion-carrera',
  templateUrl: './gestion-carrera.component.html',
  styleUrls: ['./gestion-carrera.component.scss'],
})
export class GestionCarreraComponent implements OnInit {
  carreras: Carrera[];
  createComponent = false;
  columnas = ['nombre', 'descripcion', 'actions'];

  constructor(private carreraService: CarreraService) {
    this.getCarreras();
  }

  ngOnInit(): void {}

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.carreraService
        .deleteCarrera(data.id)
        .subscribe((res) => this.getCarreras());
    }
  }

  getCarreras() {
    this.carreraService.getCarreras().subscribe((carreras) => {
      this.carreras = carreras.map((carrera) => ({ ...carrera, id: carrera.carreraId }));
      this.createComponent = true;
    });
  }
}
