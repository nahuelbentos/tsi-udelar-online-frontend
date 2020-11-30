import { Component, OnInit } from '@angular/core';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';

@Component({
  selector: 'app-administrar-materiales',
  templateUrl: './administrar-materiales.component.html',
  styleUrls: ['./administrar-materiales.component.scss']
})
export class AdministrarMaterialesComponent implements OnInit {
  // tipo = TipoUsuario.Docente;
  constructor() { }

  ngOnInit(): void {
  }

}
