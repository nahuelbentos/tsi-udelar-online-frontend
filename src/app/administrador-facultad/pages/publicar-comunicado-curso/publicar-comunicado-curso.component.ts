import { Component, OnInit } from '@angular/core';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';

@Component({
  selector: 'app-publicar-comunicado-curso',
  templateUrl: './publicar-comunicado-curso.component.html',
  styleUrls: ['./publicar-comunicado-curso.component.scss']
})
export class PublicarComunicadoCursoComponent implements OnInit {
  tipo = TipoUsuario.AdministradorFacultad;
  
  constructor() { }

  ngOnInit(): void {
  }

}
