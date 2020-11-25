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
      link: 'explorar-cursos',
      titulo: 'Explorar Cursos',
    },
    {
      link: 'cursos-publicos',
      titulo: 'Todos los cursos',
    },
    {
      link: 'matricularse-curso',
      titulo: 'Matricularse a un Curso',
    },
    {
      link: 'inscripcion-evaluacion',
      titulo: 'Inscribirse a evaluación',
    },
    {
      link: 'mis-calificaciones',
      titulo: 'Mis calificaciones',
    },
    {
      link: 'encuesta',
      titulo: 'Encuestas',
    },
    {
      link: 'publicar-comunicado',
      titulo: 'Publicar Comunicado',
    },
    {
      link: 'reportes',
      titulo: 'Reportes',
    }
  ]
  constructor() {}

  ngOnInit(): void {}
}
