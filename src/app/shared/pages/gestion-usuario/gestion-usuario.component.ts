import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Actions } from 'src/app/models/actions.model';
import { Columna } from 'src/app/models/columna.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { Usuario } from 'src/app/models/usuario.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.scss'],
})
export class GestionUsuarioComponent implements OnInit, OnChanges {
  rol: string = this.auth.getUser().rol;
  @Input() tipo: TipoUsuario = null; //this.auth.getUser().tipo;
  @Input() tipoSingular = 'usuario';
  @Input() tituloSingular = 'usuario';
  @Input() tituloPlural = 'usuarios';

  usuarios: Usuario[];
  createComponent = false;

  columnas: string[] = ['nombres', 'apellidos', 'email', 'actions'];

  @Input() actions: Actions[] = null;
  @Input() actionsHeader: Actions[] = null;

  constructor(
    private usuarioService: UsuarioService,
    private auth: AutenticacionService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    
    this.getUsuarios();
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios = () =>
    this.tipo
      ? this.usuarioService
          .getUsuariosByTipo(this.tipo)
          .subscribe((usuarios) => {
            this.usuarios = usuarios;
            this.createComponent = true;
          })
      : this.usuarioService.getUsuariosByRol(this.rol).subscribe((usuarios) => {
          this.usuarios = usuarios;
          this.createComponent = true;
        });

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
