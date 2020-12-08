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
      link: 'encuestas',
      titulo: 'Encuestas',
    },
    {
      link: 'pruebaonline',
      titulo: 'Administrar pruebas online',
    },
    {
      link: 'administrar-calificaciones',
      titulo: 'Administrar calificaciones',
    },
    {
      link: 'estudiantes',
      titulo: 'Estudiantes por curso',
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
      link: 'administrar-foros',
      titulo: 'Administrar foros',
    },
    {
      link: 'administrar-clasesdictadas',
      titulo: 'Clases Dictadas',
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
      link: 'perfil',
      titulo: 'Perfil',
    },
    {
      link: 'informes',
      titulo: 'Informes',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
