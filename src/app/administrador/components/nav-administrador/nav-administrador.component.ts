import { Component, OnInit } from '@angular/core';
import { RutasNav } from 'src/app/models/rutas-nav.interface';

@Component({
  selector: 'app-nav-administrador',
  templateUrl: './nav-administrador.component.html',
  styleUrls: ['./nav-administrador.component.scss'],
})
export class NavAdministradorComponent implements OnInit {
  rol = 'administrador';
  routes: RutasNav[] = [
    {
      link: 'curso',
      titulo: 'Cursos',
    },
    {
      link: 'comunicado',
      titulo: 'Comunicados',
    },
    {
      link: 'templatecurso',
      titulo: 'TemplateCurso',
    },
    {
      link: 'curso/abm-curso',
      titulo: 'ABM - Curso',
    },
    {
      link: 'usuario/abm-usuario',
      titulo: 'ABM - Usuario',
    },
    {
      link: 'comunicado/abm-comunicado',
      titulo: 'ABM - Comunicado',
    },
    {
      link: 'templatecurso/abm-templatecurso',
      titulo: 'ABM - TemplateCurso',
    },
  ];
  constructor() {}
  ngOnInit(): void {}
}
