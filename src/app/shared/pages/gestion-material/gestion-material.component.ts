import { Component, OnInit } from '@angular/core';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { Material } from 'src/app/models/material.model';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-gestion-material',
  templateUrl: './gestion-material.component.html',
  styleUrls: ['./gestion-material.component.scss']
})
export class GestionMaterialComponent implements OnInit {
  materiales: Material[];
  createComponent = false;
  columnas = ['nombre', 'descripcion', 'actions'];

  constructor(private materialService: MaterialService) {
    this.getMateriales();
  }

  ngOnInit(): void {}

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.materialService
        .deleteMaterial(data.id)
        .subscribe((res) => this.getMateriales());
    }
  }

  getMateriales() {
    this.materialService.getMateriales().subscribe((materiales) => {
      this.materiales = materiales.map((material) => ({ ...material, id: material.materialId }));
      this.createComponent = true;
    });
  }

}

