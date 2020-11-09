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
<<<<<<< HEAD
      link: 'foro',
      titulo: 'Foros',
    },
    {
=======
>>>>>>> e619c66b1e373a315325a250acceab4564c4f771
      link: 'material',
      titulo: 'Materiales',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
