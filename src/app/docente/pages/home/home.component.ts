import { Component, OnInit } from '@angular/core';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tipo: string;
  tipoUsuario: TipoUsuario = TipoUsuario.Docente;
  actionsHeader = [{}];
  actions = null;
  constructor() {}

  ngOnInit(): void {
    this.actions = [{}];
  }

}
