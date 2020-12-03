import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Curso } from 'src/app/models/curso.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-gestion-curso',
  templateUrl: './gestion-curso.component.html',
  styleUrls: ['./gestion-curso.component.scss'],
})
export class GestionCursoComponent implements OnInit {
  usuarioSesion: UsuarioSesion = this.autenticacionService.getUser();

  @Input() tipo: TipoUsuario;
  @Input() facultadId: string = null;
  @Input() actionsHeader = null; //[{}];
  @Input() actions = null; //[{}];

  cursos: Curso[];
  createComponent = false;
  puedeAgregar = this.usuarioSesion.rol === 'Administrador';
  @Input() columnas = ['nombre', 'descripcion', 'modalidad', 'actions'];

  constructor(
    private cursoService: CursoService,
    private autenticacionService: AutenticacionService
  ) {}

  ngOnInit(): void {
    console.log('2) this.columnas:: ', this.columnas);
    this.getCursos();
  }

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.cursoService
        .deleteCurso(data.id)
        .subscribe((res) => this.getCursos());
    }
  }

  getCursos() {
    switch (this.usuarioSesion.rol) {
      case TipoUsuario.Administrador:
        this.getCursosAdminstrador();

        break;
      case TipoUsuario.AdministradorFacultad: // By Facultad
        this.cursoService
          .getCursosByFacultad(this.usuarioSesion.facultad.facultadId)
          .subscribe((cursos) => {
            this.cursos = cursos.map((curso) => ({
              ...curso,
              id: curso.cursoId,
            }));
            this.createComponent = true;
          });
        break;

      default:
        this.usuarioSesion.tipo === TipoUsuario.Administrador
          ? this.getCursosAdminstrador()
          : // By Usuario
            this.cursoService
              .getCursosByUsuario(this.usuarioSesion.id)
              .subscribe((cursos) => {
                this.cursos = cursos.map((curso) => ({
                  ...curso,
                  id: curso.cursoId,
                }));
              });
        break;
    }
  }

  getCursosAdminstrador() {
    if (this.facultadId) {
      this.cursoService
        .getCursosByFacultad(this.facultadId)
        .subscribe((cursos) => {
          this.cursos = cursos.map((curso) => ({
            ...curso,
            id: curso.cursoId,
          }));
        });
    } else {
      this.cursoService.getCursos().subscribe((cursos) => {
        this.cursos = cursos.map((curso) => ({
          ...curso,
          id: curso.cursoId,
        }));
      });
    }
  }
}
