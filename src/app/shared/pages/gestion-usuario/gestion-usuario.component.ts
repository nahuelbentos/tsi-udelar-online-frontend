import { Component, OnInit } from '@angular/core';
import { Columna } from 'src/app/models/columna.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.scss'],
})
export class GestionUsuarioComponent implements OnInit {
  usuarios: Usuario[];
  createComponent = false;

  columnas: string[] = ['nombres', 'apellidos', 'email', 'actions'];

  /*
  [
    { key: 'nombres', description: 'Nombres' },
    { key: 'apellidos', description: 'Apellidos' },
    { key: 'tipoUsuario', description: 'Tipo de Usuario' },
    { key: 'actions', description: 'actions' },
  ];
  ['nombres', 'apellidos', 'email', 'actions'];
  */
  constructor(private usuarioService: UsuarioService) {
    this.getUsuarios();
  }

  ngOnInit(): void {}

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
      this.createComponent = true;
    });
  }

  async onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.

      const usuario = await this.usuarioService
        .getUsuarioById(data.id)
        .toPromise();
      this.usuarioService
        .deleteUsuario(usuario.email)
        .subscribe((res) => this.getUsuarios());
    }
  }
}
