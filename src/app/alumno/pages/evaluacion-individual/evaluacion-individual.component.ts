import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoPruebaOnline } from 'src/app/models/alumno-prueba-online.model';
import { PruebaOnline } from 'src/app/models/prueba-online.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { PruebaOnlineService } from 'src/app/services/prueba-online.service';


import * as moment from 'moment'; 

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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  pruebaOnline: PruebaOnline;
  
  alumnoPruebaOnline: AlumnoPruebaOnline;
  alumnoPruebaOnlineForm: FormGroup;
  respuestasForm: FormGroup[] = [];

  pruebaOnlineId: string;
  alumno = this.auth.getUser();

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
    private fb: FormBuilder,
    private router: Router,
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

    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
  }

  private setValuesOnForm(pruebaOnline: PruebaOnline) {
    this.pruebaOnline = pruebaOnline;
    console.log(pruebaOnline);
    
    this.alumnoPruebaOnline = new AlumnoPruebaOnline()
    
    this.alumnoPruebaOnline.PruebaOnlineData = pruebaOnline;
    this.alumnoPruebaOnline.alumno = this.auth.getUser();
    this.alumnoPruebaOnline.alumnoId = this.auth.getUser().id;
    this.alumnoPruebaOnline.fechaInicio = new Date();
    this.alumnoPruebaOnline.fechaExpiracion = moment().add(pruebaOnline.minutosExpiracion, 'minutes').toDate();

 

    pruebaOnline.listaPreguntaRespuesta.forEach((preguntaRespuesta) => {
      const posiblesRespuestas = [preguntaRespuesta.respuesta1, preguntaRespuesta.respuesta2, preguntaRespuesta.respuesta3, preguntaRespuesta.respuesta4];
      const group = this.fb.group({
        pregunta: [preguntaRespuesta.pregunta],
        respuestasPosibles: [posiblesRespuestas],
        respuestaCorrecta: [preguntaRespuesta.respuestaCorrecta],
        respuestaId: [0],        
      });

      this.respuestasForm.push(group);
    });
  }

  private buildForm() {
    this.alumnoPruebaOnlineForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaRealizada: [''],
      fechaFinalizada: [''],
      fecha: [''],
      url: [''],
      minutosExpiracion: ['', Validators.required],
      activa: [false],
    });
  }
}
