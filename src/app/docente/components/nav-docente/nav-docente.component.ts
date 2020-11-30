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
      link: 'perfil',
      titulo: 'Perfil',
    },
    {
      link: 'administrar-calificaciones',
      titulo: 'Administrar calificaciones',
    },
    {
      link: 'administrar-foros',
      titulo: 'Administrar foros',
    },
    // {
    //   link: 'administrar-materiales',
    //   titulo: 'Administrar materiales',
    // },
    {
      link: 'calendario',
      titulo: 'Calendario de Actividades',
    },
    {
      link: 'estudiantes',
      titulo: 'Estudiantes por curso',
    },
    {
      link: 'administrar-pruebas-online',
      titulo: 'Administrar pruebas online',
    },
    {
      link: 'administrar-entregas',
      titulo: 'Administrar entregas',
    },
    {
      link: 'administrar-notas-curso-pruebasonline',
      titulo: 'Manejo de notas de cursos y evaluaciones',
    },
    {
      link: 'encuestas',
      titulo: 'Encuestas',
    },
    {
      link: 'informes',
      titulo: 'Informes',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
