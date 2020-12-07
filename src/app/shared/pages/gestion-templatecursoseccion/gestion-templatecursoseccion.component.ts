import { Component, OnInit } from '@angular/core';
import { TemplateCursoSeccion } from '../../../models/template-curso-seccion.model';
import { TemplateCursoSeccionService } from '../../../services/template-curso-seccion.service';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';

@Component({
  selector: 'app-gestion-templatecursoseccion',
  templateUrl: './gestion-templatecursoseccion.component.html',
  styleUrls: ['./gestion-templatecursoseccion.component.scss']
})
export class GestionTemplateCursoSeccionComponent implements OnInit {

  templatesCursoSeccion: TemplateCursoSeccion[];
  createComponent = false;
  columnas = ['templatecurso', 'seccion', 'actions'];

  constructor(private templateCursoSeccionService: TemplateCursoSeccionService) { }

  ngOnInit(): void {
    this.getTemplatesCursoSeccion();
  }

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.templateCursoSeccionService
        .deleteTemplateCursoSeccion(data.id)
        .subscribe((res) => this.getTemplatesCursoSeccion());
    }
  }

  getTemplatesCursoSeccion() {
    this.templateCursoSeccionService.getCTemplatesCursoSeccion().subscribe((templatesCursoSeccion) => {
      this.templatesCursoSeccion = templatesCursoSeccion.map((templateCursoSeccion) => ({
        ...templateCursoSeccion,
        id: templateCursoSeccion.templateCursoSeccionId,
      }));
      this.createComponent = true;
    });
  }

}
