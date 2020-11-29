import { Component, OnInit } from '@angular/core';
import { Respuesta } from 'src/app/models/respuesta.model';
import { RespuestaService } from 'src/app/services/respuesta.service';

@Component({
  selector: 'app-abm-pregunta',
  templateUrl: './abm-pregunta.component.html',
  styleUrls: ['./abm-pregunta.component.scss']
})
export class AbmPreguntaComponent implements OnInit {

  respuestas: Respuesta[] = []
  createComponent = false;  
  columnas = ['actions-abm', 'mensaje', 'confirm-cancel'];
  constructor(private respuestaService : RespuestaService) { 
    this.getRespuestaByPregunta();
  }

  ngOnInit(): void {
  }
  

  getRespuestaByPregunta() {
    this.respuestaService.getRespuestas().subscribe((respuestas) => {
      this.respuestas = respuestas.map((respuesta) => ({
        ...respuesta,
        id: respuesta.respuestaId,
      }));
      this.createComponent = true;
    });
  }
}
