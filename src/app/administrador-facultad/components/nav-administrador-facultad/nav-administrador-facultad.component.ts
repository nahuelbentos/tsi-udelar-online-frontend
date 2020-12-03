import { Component, OnInit } from '@angular/core';
import { RutasNav } from 'src/app/models/rutas-nav.interface';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-nav-administrador-facultad',
  templateUrl: './nav-administrador-facultad.component.html',
  styleUrls: ['./nav-administrador-facultad.component.scss'],
})
export class NavAdministradorFacultadComponent implements OnInit {
  color = `#${this.autenticacionService.getUser().facultad.colorCodigo}`;
  rol = 'administrador facultad';
  routes: RutasNav[] = [
    {
      link: 'facultad',
      titulo: 'Facultad',
    },
    {
      link: 'usuario',
      titulo: 'Usuarios',
    },
    {
      link: 'templatecurso',
      titulo: 'Templates de Cursos',
    },
    {
      link: 'docente',
      titulo: 'Docentes',
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
      link: 'administrar-materiales',
      titulo: 'Administrar materiales',
    },
    {
      link: 'encuesta',
      titulo: 'Encuestas',
    },
    {
      link: 'comunicado',
      titulo: 'Comunicados',
    },
    {
      link: 'reportes',
      titulo: 'Reportes',
    },
  ];
  constructor(private autenticacionService: AutenticacionService) {}

  ngOnInit(): void {}
}
