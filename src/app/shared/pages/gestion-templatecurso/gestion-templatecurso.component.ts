import { Component, OnInit } from '@angular/core';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { TemplateCurso } from 'src/app/models/template-curso.model';
import { TemplatecursoService } from 'src/app/services/templatecurso.service';

@Component({
  selector: 'app-gestion-templatecurso',
  templateUrl: './gestion-templatecurso.component.html',
  styleUrls: ['./gestion-templatecurso.component.scss'],
})
export class GestionTemplatecursoComponent implements OnInit {
  templateCursos: TemplateCurso[];
  createComponent = false;
  columnas = ['nombre', 'descripcion', 'actions'];
 

  constructor(private templateCursoService: TemplatecursoService) {
    this.getTemplateCursos();
  }

  ngOnInit(): void {
     
  }

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      // this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.templateCursoService
        .deleteTemplateCurso(data.id)
        .subscribe((res) => this.getTemplateCursos());
    }
  }

  getTemplateCursos() {
    this.templateCursoService
      .getTemplateCursos()
      .subscribe((templateCursos) => {
        this.templateCursos = templateCursos.map((templateCurso) => ({
          ...templateCurso,
          id: templateCurso.templateCursoId,
        }));
        // this.createComponent = true;
      });
  }
}
