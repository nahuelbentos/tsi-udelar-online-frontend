import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { RutasNav } from 'src/app/models/rutas-nav.interface';

@Component({
  selector: 'app-nav-alumno',
  templateUrl: './nav-alumno.component.html',
  styleUrls: ['./nav-alumno.component.scss'],
})
export class NavAlumnoComponent implements OnInit {
  rol = 'alumno';
  routes: RutasNav[] = [
    {
      link: '/home',
      titulo: 'home',
    },
    {
      link: '/home2',
      titulo: 'home2',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
