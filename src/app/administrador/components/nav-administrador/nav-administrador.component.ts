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
      link: 'carrera',
      titulo: 'Carreras',
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
      titulo: 'Template de Cursos',
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
      titulo: 'Mensaje Tema',
    },
    {
      link: 'actividad',
      titulo: 'Actividades',
    },
    {
      link: 'publicar-comunicado-facultad',
      titulo: 'Publicar Comunicado en Facultad',
    },
    {
      link: 'cursoseccion',
      titulo: 'Curso seccion',
    }, 
    {
      link: 'reportes',
      titulo: 'Reportes',
    },
  ];
  constructor() {}
  ngOnInit(): void {}
}
