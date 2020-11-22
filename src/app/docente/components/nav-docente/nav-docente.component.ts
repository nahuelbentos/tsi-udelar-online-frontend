import { Component, OnInit } from '@angular/core';
import { RutasNav } from 'src/app/models/rutas-nav.interface';

@Component({
  selector: 'app-nav-docente',
  templateUrl: './nav-docente.component.html',
  styleUrls: ['./nav-docente.component.scss'],
})
export class NavDocenteComponent implements OnInit {
  rol = 'docente';
  routes: RutasNav[] = [
    {
      link: 'curso',
      titulo: 'Cursos',
    },
    {
      link: 'respuesta/abm-respuesta',
      titulo: 'ABM Respuesta',
    },
    {
      link: 'temaforo/abm-temaforo',
      titulo: 'ABM TemaForo',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
