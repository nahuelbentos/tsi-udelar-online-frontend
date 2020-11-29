import { Component, OnInit } from '@angular/core';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {
  tipo = TipoUsuario.Docente;
  constructor() { }

  ngOnInit(): void {
  }

}
