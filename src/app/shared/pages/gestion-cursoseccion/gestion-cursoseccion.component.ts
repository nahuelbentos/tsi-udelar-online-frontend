import { Component, OnInit } from '@angular/core';
import { CursoSeccion } from '../../../models/curso-seccion.model';
import { CursoSeccionService } from '../../../services/curso-seccion.service';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';

@Component({
  selector: 'app-gestion-cursoseccion',
  templateUrl: './gestion-cursoseccion.component.html',
  styleUrls: ['./gestion-cursoseccion.component.scss']
})
export class GestionCursoSeccionComponent implements OnInit {

  cursosSeccion: CursoSeccion[];
  createComponent = false;
  columnas = ['curso', 'seccion', 'actions'];

  constructor(private cursoSeccionService: CursoSeccionService) { }

  ngOnInit(): void {
    this.getsCursoSeccion();
  }

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.cursoSeccionService
        .deleteCursoSeccion(data.id)
        .subscribe((res) => this.getsCursoSeccion());
    }
  }

  getsCursoSeccion() {
    console.log('1');
    
    this.cursoSeccionService.getCursosSeccion().subscribe((cursosSeccion) => {
      this.cursosSeccion = cursosSeccion.map((cursoSeccion) => ({
        ...cursoSeccion,
        id: cursoSeccion.CursoSeccionId,
      }));
      this.createComponent = true;

    console.log('2');
    });
  }

}
