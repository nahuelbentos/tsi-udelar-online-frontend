import { Component, OnInit } from '@angular/core';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent implements OnInit {
  tipo = TipoUsuario.Alumno;
  constructor() {}

  ngOnInit(): void {}
}
