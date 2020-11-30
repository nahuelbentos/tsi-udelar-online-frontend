import { Component, OnInit } from '@angular/core';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';

@Component({
  selector: 'app-publicar-comunicado',
  templateUrl: './publicar-comunicado.component.html',
  styleUrls: ['./publicar-comunicado.component.scss']
})
export class PublicarComunicadoComponent implements OnInit {
  tipo = TipoUsuario.Administrador;
  constructor() { }

  ngOnInit(): void {
  }

}
