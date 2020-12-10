import { Component, Input, OnInit } from '@angular/core';
import { Actions } from 'src/app/models/actions.model';
import { Curso } from 'src/app/models/curso.model';
import { Facultad } from 'src/app/models/facultad.model';
import { CursoService } from 'src/app/services/curso.service';
import { FacultadService } from 'src/app/services/facultad.service';
import { SeleccionarFacultadComponent } from 'src/app/shared/dialogs/seleccionar-facultad/seleccionar-facultad.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tipo: string;
  actionsHeader = [{}];
  actions = [{}];
  cursos: Curso[] = [];
  facultades: Facultad[] = [];
  verCursos = false;
  facultadDialog = SeleccionarFacultadComponent;
  constructor(
    private cursoService: CursoService,
    private facultadService: FacultadService
  ) {}

  ngOnInit(): void {
    this.facultadService
      .getFacultades()
      .subscribe((facultades) => (this.facultades = facultades.map((facultad) => ({
          ...facultad,
          descripcionAutocomplete: `${facultad.nombre} - ${facultad.descripcion}`,
        }))));
  }

  getFacultadItem(facultad: Facultad) {
    this.cursoService
      .getCursosByFacultad(facultad.facultadId)
      .subscribe((cursos) => {
        this.cursos = cursos;
        this.verCursos = true;
      });
  }
}
