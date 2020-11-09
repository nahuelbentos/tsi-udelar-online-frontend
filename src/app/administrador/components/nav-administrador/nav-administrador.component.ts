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
      link: 'usuario',
      titulo: 'Usuarios',
    },
    {
      link: 'carrera',
      titulo: 'Carreras',
    },
    {
      link: 'material',
      titulo: 'Materiales',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
