import { Component, Input, OnInit } from '@angular/core';
import { AlumnoCurso } from 'src/app/models/alumno-curso.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { AlumnoCursoService } from 'src/app/services/alumno-curso.service';

@Component({
  selector: 'app-gestion-alumnocurso',
  templateUrl: './gestion-alumnocurso.component.html',
  styleUrls: ['./gestion-alumnocurso.component.scss']
})
export class GestionAlumnocursoComponent implements OnInit {

  @Input() tipoSingular = 'alumnocurso';
  @Input() tituloPlural = 'alumnoscurso';

  @Input() alumnosCurso: AlumnoCurso[];
  createComponent = false;
  columnas = ['calificacion','actions'];

  constructor(private alumnoCursoService : AlumnoCursoService) { 
    this.getAlumnosCurso();
  }

  ngOnInit(): void {
  }

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.alumnoCursoService
        .deleteAlumnoCurso(data.id)
        .subscribe((res) => this.getAlumnosCurso());
    }
  }

  getAlumnosCurso() {
    this.alumnoCursoService.getAlumnosCurso().subscribe((alumnosCurso) => {
      this.alumnosCurso = alumnosCurso.map((alumnoCurso) => ({
        ...alumnoCurso,
        id: alumnoCurso.alumnoCursoId,
      }));
      this.createComponent = true;
    });
  }

}
