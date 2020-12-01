import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/models/curso.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  styleUrls: ['./mis-cursos.component.scss'],
})
export class MisCursosComponent implements OnInit {
  actions = [{}];
  actionsHeader = [{}];
  constructor(
    private auth: AutenticacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actions = this.actions = [
      {
        tooltip: `Ingresar al curso`,
        callback: this.vistaCurso,
        backgroundColor: '#43a047',
        icon: 'login',
      },
    ];
  }

  vistaCurso = (curso: Curso) =>
    this.router.navigate([`/${this.auth.getRolSesion().toLowerCase()}/curso`], {
      queryParams: { id: curso.cursoId },
      relativeTo: this.route,
    });
}
