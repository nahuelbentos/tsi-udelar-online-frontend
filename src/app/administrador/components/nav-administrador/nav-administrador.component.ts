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
      link: 'curso/abm-curso',
      titulo: 'ABM - Curso',
    },
    {
      link: 'usuario/abm-usuario',
      titulo: 'ABM - Usuario',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
