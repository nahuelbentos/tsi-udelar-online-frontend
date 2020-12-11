import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Foro } from 'src/app/models/foro.model';
import { TemaForo } from 'src/app/models/tema-foro.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ForoService } from 'src/app/services/foro.service';
import { MensajetemaService } from 'src/app/services/mensajetema.service';
import { TemaForoService } from 'src/app/services/tema-foro.service';

@Component({
  selector: 'app-ver-tema-foro',
  templateUrl: './ver-tema-foro.component.html',
  styleUrls: ['./ver-tema-foro.component.scss'],
})
export class VerTemaForoComponent implements OnInit {
  foroId: string;
  temaForoId: string;
  foro: Foro;
  temaForo: TemaForo;
  usuarioSesion = this.auth.getUser();
  constructor(
    private foroService: ForoService,
    private temaForoService: TemaForoService,
    private mensajeTemaService: MensajetemaService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AutenticacionService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.foroId = param.foroId;
      this.temaForoId = param.temaForoId;

      console.log('temaforoId:: ', param.temaForoId);
      

      if (param.foroId) {
        this.foroService
          .getForoById(this.foroId)
          .subscribe((foro) => this.setFormData(foro));
      }
    });
  }

  setFormData = (foro: Foro) => {
    this.foro = foro;
    
    this.temaForo = foro.temaForoLista.find(
      (temaForo) => (temaForo.temaForoId === this.temaForoId)
      );

    
  };

  cargarRespuestas = (huboRespuesta) => {
    console.log('huboRespuesta: ', huboRespuesta);
    
        this.foroService
          .getForoById(this.foroId)
          .subscribe((foro) => this.setFormData(foro));

  };
}
