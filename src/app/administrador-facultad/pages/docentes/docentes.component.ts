import { Component, OnInit } from '@angular/core';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.scss'],
})
export class DocentesComponent implements OnInit {
  usuario = this.auth.getUser();
  tipo = TipoUsuario.Docente;
  actionsHeader = [{}];

  docentes = [];
  constructor(
    private usuarioService: UsuarioService,
    private auth: AutenticacionService
  ) {
    this.usuarioService.getDocentesByFacultad(this.usuario.facultad.facultadId).subscribe( docentes => this.docentes = docentes);
  }

  ngOnInit(): void {}
}
