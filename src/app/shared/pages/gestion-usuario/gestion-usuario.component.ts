import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Actions } from 'src/app/models/actions.model';
import { Columna } from 'src/app/models/columna.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { Usuario } from 'src/app/models/usuario.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.scss'],
})
export class GestionUsuarioComponent implements OnInit, OnChanges {
  usuarioId: string = this.auth.getUser().id;
  @Input() tipo: TipoUsuario = null; //this.auth.getUser().tipo;
  @Input() tipoSingular = 'usuario';
  @Input() tituloSingular = 'usuario';
  @Input() tituloPlural = 'usuarios';

  @Input() usuarios: Usuario[] = null;
  createComponent = false;

  columnas: string[] = ['nombres', 'apellidos', 'email', 'actions'];

  @Input() actions: Actions[] = null;
  @Input() actionsHeader: Actions[] = null;

  constructor(
    private usuarioService: UsuarioService,
    private auth: AutenticacionService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('estoy acá:');

    if (changes.usuarios) {
      this.usuarios = changes.usuarios.currentValue;
    } else {
      this.getUsuarios();
    }
  }

  ngOnInit(): void {
    
    if(!this.usuarios){
      this.getUsuarios();
    }
  }

  getUsuarios = () =>{
    
    this.tipo
      ? this.usuarioService
          .getUsuariosByTipo(this.tipo)
          .subscribe((usuarios) => (this.usuarios = usuarios))
      : this.usuarioService
          .getUsuariosByRol(this.usuarioId)
          .subscribe((usuarios) => (this.usuarios = usuarios))
  }

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.

      this.usuarioService
        .getUsuarioById(data.id)
        .subscribe((usuario) =>
          this.usuarioService
            .deleteUsuario(usuario.email)
            .subscribe((res) => this.usuarioEliminado(usuario))
        );
    }
  }

  usuarioEliminado = (usuario: Usuario) => {
    mensajeConfirmacion(
      'Excelente',
      `Se Elimino el usuario ${usuario.nombres} ${usuario.apellidos}, exitosamente.`
    ).then(() => this.getUsuarios());
  };
}
