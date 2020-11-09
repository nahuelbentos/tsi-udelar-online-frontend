import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Curso } from 'src/app/models/curso.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-gestion-curso',
  templateUrl: './gestion-curso.component.html',
  styleUrls: ['./gestion-curso.component.scss'],
})
export class GestionCursoComponent implements OnInit {
  cursos: Curso[];
  createComponent = false;
  columnas = ['nombre', 'descripcion', 'modalidad', 'actions'];

  constructor(private cursoService: CursoService) {
    this.getCursos();
  }

  ngOnInit(): void {}

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.cursoService
        .deleteCurso(data.id)
        .subscribe((res) => this.getCursos());
    }
  }

  getCursos() {
    this.cursoService.getCursos().subscribe((cursos) => {
      this.cursos = cursos.map((curso) => ({ ...curso, id: curso.cursoId }));
      this.createComponent = true;
    });
  }
}
