import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoPruebaOnline } from 'src/app/models/alumno-prueba-online.model';
import { PruebaOnline } from 'src/app/models/prueba-online.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { PruebaOnlineService } from 'src/app/services/prueba-online.service';


import * as moment from 'moment'; 
import { confirmacionUsuario, infoMensaje, mensajeConfirmacion, warningMensaje } from 'src/app/utils/sweet-alert';
import { RespuestaPrueba } from 'src/app/models/respuesta-prueba.model';
import { AlumnoPruebaOnlineService } from 'src/app/services/alumno-prueba-online.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-evaluacion-individual',
  templateUrl: './evaluacion-individual.component.html',
  styleUrls: ['./evaluacion-individual.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class EvaluacionIndividualComponent implements OnInit {
  pruebaOnline: PruebaOnline;

  alumnoPruebaOnline: AlumnoPruebaOnline;
  alumnoPruebaOnlineForm: FormGroup;
  respuestasForm: FormGroup[] = [];

  pruebaOnlineId: string;
  alumno = this.auth.getUser();

  calificacion: number = null;

  get fechaInicio() {
    return this.alumnoPruebaOnlineForm.get('fechaInicio');
  }

  get fechaFin() {
    return this.alumnoPruebaOnlineForm.get('fechaFin');
  }

  get fechaExpiracion() {
    return this.alumnoPruebaOnlineForm.get('fechaExpiracion');
  }

  get nota() {
    return this.alumnoPruebaOnlineForm.get('nota');
  }

  get inscripto() {
    return this.alumnoPruebaOnlineForm.get('inscripto');
  }

  constructor(
    private pruebaOnlineService: PruebaOnlineService,
    private alumnopruebaOnlineService: AlumnoPruebaOnlineService,
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private auth: AutenticacionService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.pruebaOnlineId = param.id;

      if (param.id) {
        this.pruebaOnlineService
          .getPruebaOnlineById(this.pruebaOnlineId)
          .subscribe((pruebaOnline) => this.setValuesOnForm(pruebaOnline));
      }
    });
  }

  private setValuesOnForm(pruebaOnline: PruebaOnline) {
    this.pruebaOnline = pruebaOnline;
    const minutosAviso = pruebaOnline.minutosExpiracion - 5;
    console.log(pruebaOnline);
    infoMensaje(
      'Atención!!!',
      `Está a punto de iniciar la evaluación, la misma dura ${pruebaOnline.minutosExpiracion} minutos. `
    ).then((result) => {

      setTimeout(() => this.avisoPocoTiempo(), minutosAviso * 60000);
      setTimeout(() => this.finalizarEvaluacion(true), pruebaOnline.minutosExpiracion * 60000);

      this.alumnoPruebaOnline = new AlumnoPruebaOnline();

      this.alumnoPruebaOnline.PruebaOnlineData = pruebaOnline;
      this.alumnoPruebaOnline.pruebaOnlineId = pruebaOnline.actividadId;
      this.alumnoPruebaOnline.evaluacion = `${pruebaOnline.nombre} - ${pruebaOnline.descripcion}`
      this.alumnoPruebaOnline.alumno = this.auth.getUser();
      this.alumnoPruebaOnline.alumnoId = this.auth.getUser().id;
      this.alumnoPruebaOnline.fechaInicio = new Date();
      this.alumnoPruebaOnline.fechaExpiracion = moment()
        .add(pruebaOnline.minutosExpiracion, 'minutes')
        .toDate();

      pruebaOnline.listaPreguntaRespuesta.forEach((preguntaRespuesta) => {
        console.log('pregunta:: ', preguntaRespuesta);
        
        const posiblesRespuestas = [
          preguntaRespuesta.respuesta1,
          preguntaRespuesta.respuesta2,
          preguntaRespuesta.respuesta3,
          preguntaRespuesta.respuesta4,
        ];

        const group = this.fb.group({
          pregunta: [preguntaRespuesta.pregunta],
          respuestasPosibles: [posiblesRespuestas],
          respuestaCorrecta: [preguntaRespuesta.respuestaCorrecta],
          respuestaId: [0],
          puntos:[preguntaRespuesta.puntos],
          resta:[preguntaRespuesta.resta],
          preguntaRespuestaId: [preguntaRespuesta.preguntaRespuestaId]
        });

        this.respuestasForm.push(group);
      });
    });
  }
 
  avisoPocoTiempo = () => warningMensaje( 'Atención!!!', `Le quedan 5 minutos para finalizar la evaluación, vaya redondeando. 
  Si se llega a los 5 minutos, se finalizará automatiamente con lo que haya contestado. ` );

  finalizarEvaluacion(expirada?: boolean) {
    
    this.alumnoPruebaOnline.fechaFin = moment().toDate();

    if(!expirada){
      confirmacionUsuario('Finalizar evaluación', 'Confirma que quiere dar por finalizada la evaluación?')
        .then( result => result.isConfirmed ? this.calcularCalificacion() : ''  )
    } else {
      infoMensaje('Tiempo Finalizado :(', 'Su calificación se podrá ver a continuación').then( () => this.calcularCalificacion())
      
    }
         
  }

  calcularCalificacion() {
    
    const respuestas: RespuestaPrueba[] = this.respuestasForm.map( respuesta => respuesta.value);
    console.log(respuestas);
    console.log('correctas:: ', respuestas.filter(respuesta => respuesta.respuestaCorrecta === respuesta.respuestaId) );

    const calificacionMaxima = respuestas.map(respuesta => respuesta.puntos).reduce((sum, puntos) => sum + puntos); 
    const respuestasCorrectas = respuestas.filter(respuesta => respuesta.respuestaCorrecta === respuesta.respuestaId);
    
    const calificacion = respuestasCorrectas.length === 0 
                          ? 0 
                          : respuestasCorrectas.map((respuesta) => respuesta.puntos)
                                               .reduce((sum, puntos) => sum + puntos); 
    console.log(calificacionMaxima);  
    
    const porcentajeCalifiacion = parseFloat(Math.round( ((calificacion*100) / calificacionMaxima)).toFixed(2));
    console.log(calificacion);
    console.log(porcentajeCalifiacion);
    
    this.alumnoPruebaOnline.respuestasAlumno = respuestas;
    this.alumnoPruebaOnline.nota = calificacion;
    this.alumnoPruebaOnline.calificacionPorcentaje = porcentajeCalifiacion;
    mensajeConfirmacion("Su calificación es:", ` Puntos obtenidos: ${calificacion} Porcentaje: ${porcentajeCalifiacion}%`)
      .then( () => this.commitEvaluacion())

  }

  commitEvaluacion() {
    console.log('alumnoPruebaOnline:: ', this.alumnoPruebaOnline);
    this.alumnopruebaOnlineService.updateAlumnoPruebaOnline(this.alumnoPruebaOnline).subscribe( res => this.location.back());
  }

}
