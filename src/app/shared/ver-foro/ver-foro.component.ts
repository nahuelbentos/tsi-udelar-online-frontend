import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from 'src/app/models/actions.model';
import { Foro } from 'src/app/models/foro.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ForoService } from 'src/app/services/foro.service';
import { TemaForoService } from 'src/app/services/tema-foro.service';

@Component({
  selector: 'app-ver-foro',
  templateUrl: './ver-foro.component.html',
  styleUrls: ['./ver-foro.component.scss']
})
export class VerForoComponent implements OnInit {

  foroId: string;
  createComponent = false;
  columnas = ['asunto', 'emisor', 'actions'];
  foro: Foro;
  usuarioSesion = this.auth.getUser();

  @Input() actionsHeader: Actions[];
  @Input() actions: Actions[] = null; //[{}];

  constructor(
    private foroService: ForoService,
    private temaForoService: TemaForoService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AutenticacionService,
  ) {}

  ngOnInit(): void {
    this.actionsHeader = [{
      title: 'Añadir un nuevo tema de debate',
      callback: this.goToAddTemaCurso,
    }];
    this.route.queryParams.subscribe((param) => {
      this.foroId = param.id;

      if (param.id) {
        this.foroService
          .getForoById(this.foroId)
          .subscribe((foro) => this.foro = foro);
      }
    });
  }

  goToAddTemaCurso = () => {
    this.router.navigate([`/${this.usuarioSesion.tipo.toLocaleLowerCase()}/abm-temaForo`],
    {
      queryParams: {
        foroId: this.foroId,
        titulo: this.foro.titulo,
        descripcion: this.foro.descripcion,

      },
      relativeTo: this.route,
    });
  }



}
