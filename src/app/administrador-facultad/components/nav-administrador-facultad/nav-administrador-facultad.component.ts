import { Component, OnInit } from '@angular/core';
import { RutasNav } from 'src/app/models/rutas-nav.interface';

@Component({
  selector: 'app-nav-administrador-facultad',
  templateUrl: './nav-administrador-facultad.component.html',
  styleUrls: ['./nav-administrador-facultad.component.scss'],
})
export class NavAdministradorFacultadComponent implements OnInit {
  rol = 'administrador-facultad';
  routes: RutasNav[] = [
    {
      link: 'facultad',
      titulo: 'Facultades',
    },
    {
      link: 'curso',
      titulo: 'Cursos',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
