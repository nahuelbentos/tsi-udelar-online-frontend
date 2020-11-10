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
=======
<<<<<<< HEAD
>>>>>>> fd5cb77d55b4459a78e49e536390df78cf717008
      link: 'foro',
      titulo: 'Foros',
    },
    {
<<<<<<< HEAD
=======
=======
>>>>>>> e619c66b1e373a315325a250acceab4564c4f771
>>>>>>> fd5cb77d55b4459a78e49e536390df78cf717008
      link: 'material',
      titulo: 'Materiales',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
