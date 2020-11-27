import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Carrera } from 'src/app/models/carrera.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { CarreraService } from 'src/app/services/carrera.service';

@Component({
  selector: 'app-test-components',
  templateUrl: './test-components.component.html',
  styleUrls: ['./test-components.component.scss'],
})
export class TestComponentsComponent implements OnInit {
  carreras: Carrera[];
  carrerasOutput: Carrera[];
  createComponent = false;
  // Es importante que el primer item sea 'actions-abm'y el ultimo sea 'confirm-cacel' para que renderice bien los botones
  columnas = ['actions-abm', 'nombre', 'descripcion', 'confirm-cancel'];

  controls: FormControl[] = [];

  

  constructor(private carreraService: CarreraService) {
    this.getCarreras();
  }

  ngOnInit(): void {}

  onGetDataOutput(data): void {
    console.log('onGetDataOutput:: ', data);
  }

  getCarreras() {
    this.carreraService.getCarreras().subscribe((carreras) => {
      this.carreras = this.carrerasOutput = carreras.map((carrera) => ({
        ...carrera,
        id: carrera.carreraId,
      }));
      this.createComponent = true;
    });
  }

  newControl() {
    this.controls.push(new FormControl('')); 
  }
}
