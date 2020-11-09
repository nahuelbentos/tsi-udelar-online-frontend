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
      link: 'facultad',
      titulo: 'Facultades',
    },
    {
      link: 'curso',
      titulo: 'Cursos',
    },
    {
      link: 'encuesta',
      titulo: 'Encuestas',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
