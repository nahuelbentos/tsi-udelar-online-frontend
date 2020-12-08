import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CursoService } from 'src/app/services/curso.service';
import { SeleccionarCursoByUsuarioComponent } from 'src/app/shared/dialogs/seleccionar-curso-by-usuario/seleccionar-curso-by-usuario.component';

@Component({
  selector: 'app-calendario-actividades',
  templateUrl: './calendario-actividades.component.html',
  styleUrls: ['./calendario-actividades.component.scss'],
})
export class CalendarioActividadesComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = this.auth.getUser();
  cursos: Curso[] = [];
  verCalendario = false;
  cursoId: string;
  cursoDialog = SeleccionarCursoByUsuarioComponent;
  constructor(
    private cursoService: CursoService,
    private auth: AutenticacionService
  ) {}

  ngOnInit(): void {
    this.cursoService.getCursosByUsuario(this.usuarioLogueado.id).subscribe(
      (cursos) =>
        (this.cursos = cursos.map((curso) => ({
          ...curso,
          descripcionAutocomplete: curso.nombre,
        })))
    );
  }

  getItem(curso: Curso) {
    this.cursoId = curso.cursoId;
    this.verCalendario = true;
  }
}
