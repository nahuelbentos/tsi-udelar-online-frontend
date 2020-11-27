import { Component, OnInit } from '@angular/core';
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

  cursos: Curso[];
  createComponent = false;
  puedeAgregar = this.usuarioSesion.rol === 'Administrador';
  columnas =
    this.usuarioSesion.rol === 'Administrador'
      ? ['nombre', 'descripcion', 'modalidad', 'actions']
      : ['nombre', 'descripcion', 'modalidad'];

  constructor(
    private cursoService: CursoService,
    private autenticacionService: AutenticacionService
  ) {
    this.getCursos();
  }

  ngOnInit(): void {}

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
    this.cursoService.getCursos().subscribe((cursos) => {
      this.cursos = cursos.map((curso) => ({ ...curso, id: curso.cursoId }));
      this.createComponent = true;
    }); 
  }
}
