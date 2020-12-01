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
      link: 'comunicado',
      titulo: 'Comunicados',
    },
    {
      link: 'templatecurso',
      titulo: 'TemplateCurso',
    },
    {
      link: 'encuesta',
      titulo: 'Encuestas',
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
      link: 'foro',
      titulo: 'Foros',
    },
    {
      link: 'material',
      titulo: 'Materiales',
    },
    {
      link: 'seccion',
      titulo: 'Secciones',
    },
    {
      link: 'mensajetema',
      titulo: 'MensajeTema',
    },
    {
      link: 'actividad',
      titulo: 'Actividades',
    },
    {
      link: 'test',
      titulo: 'Tests',
    },
    {
      link: 'publicar-comunicado-facultad',
      titulo: 'Publicar Comunicado en Facultad',
    },
    {
      link: 'reportes',
      titulo: 'Reportes',
    },
    {
      link: 'mensaje',
      titulo: 'Mensaje'
    },
    {
      link: 'cursoseccion',
      titulo: 'Curso seccion'
    },
    {
      link: 'respuesta',
      titulo: 'Respuesta'
    },
    {
      link: 'temaforo',
      titulo: 'Tema Foro'
    },
    {
      link: 'templatecursoseccion',
      titulo: 'Template Curso seccion'
    }
  ];
  constructor() {}
  ngOnInit(): void {}
}
