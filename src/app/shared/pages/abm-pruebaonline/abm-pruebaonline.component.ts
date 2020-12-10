import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PruebaOnline } from 'src/app/models/prueba-online.model';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { PruebaOnlineService } from 'src/app/services/prueba-online.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-abm-pruebaonline',
  templateUrl: './abm-pruebaonline.component.html',
  styleUrls: ['./abm-pruebaonline.component.scss'],
})
export class AbmPruebaonlineComponent implements OnInit {
  pruebaOnlineForm: FormGroup;
  pruebaOnlineId: string;
  preguntasForm: FormGroup[] = [];
  modo: string;
  usuarioSesion = this.auth.getUser();

  get nombre() {
    return this.pruebaOnlineForm.get('nombre');
  }

  get descripcion() {
    return this.pruebaOnlineForm.get('descripcion');
  }

  get fechaRealizada() {
    return this.pruebaOnlineForm.get('fechaRealizada');
  }

  get fechaFinalizada() {
    return this.pruebaOnlineForm.get('fechaFinalizada');
  }

  get minutosExpiracion() {
    return this.pruebaOnlineForm.get('minutosExpiracion');
  }

  get fecha() {
    return this.pruebaOnlineForm.get('fecha');
  }

  get url() {
    return this.pruebaOnlineForm.get('url');
  }

  get activa() {
    return this.pruebaOnlineForm.get('activa');
  }

  constructor(
    private autenticacionService: AutenticacionService,
    private pruebaOnlineService: PruebaOnlineService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AutenticacionService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      
      this.modo = param.modo;
      this.pruebaOnlineId = param.id;

      if (param.id) {
        this.pruebaOnlineService
          .getPruebaOnlineById(this.pruebaOnlineId)
          .subscribe((pruebaOnline) => this.setValuesOnForm(pruebaOnline));
      }
    });
  }

  private setValuesOnForm(pruebaOnline: PruebaOnline) {
    this.nombre.setValue(pruebaOnline.nombre);
    this.descripcion.setValue(pruebaOnline.descripcion);
    this.fechaFinalizada.setValue(pruebaOnline.fechaFinalizada);
    this.fechaRealizada.setValue(pruebaOnline.fechaRealizada);
    this.fecha.setValue(pruebaOnline.fecha);
    this.activa.setValue(pruebaOnline.activa);
    this.url.setValue(pruebaOnline.url);
    this.minutosExpiracion.setValue(pruebaOnline.minutosExpiracion);

    pruebaOnline.listaPreguntaRespuesta.forEach( preguntaRespuesta => {
      
        const group = this.fb.group({
          pregunta: [preguntaRespuesta.pregunta ],
          respuesta1: [preguntaRespuesta.respuesta1 ],
          respuesta2: [preguntaRespuesta.respuesta2 ],
          respuesta3: [preguntaRespuesta.respuesta3 ],
          respuesta4: [preguntaRespuesta.respuesta4 ],
          respuestaCorrecta: [preguntaRespuesta.respuestaCorrecta ],
          puntos: [preguntaRespuesta.puntos ],
          resta: [preguntaRespuesta.resta],
        }); 
 
        this.preguntasForm.push(group);
    });

  }

  private buildForm() {
    this.pruebaOnlineForm = this.fb.group({
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

  agregarPregunta() {
    const group = this.fb.group({
      pregunta: [''],
      respuesta1: [''],
      respuesta2: [''],
      respuesta3: [''],
      respuesta4: [''],
      respuestaCorrecta: [''],
      puntos: [''],
      resta: [false],
    });
    console.log('gssroup', group);

    // this.preguntas.push(new FormControl(''));
    this.preguntasForm.push(group);
    console.log('preguntasForm ', this.preguntasForm);
  }

  onNoClick(): void {
    this.router.navigate([
      `/${this.autenticacionService.getRolSesion().toLowerCase()}/pruebaonline`,
    ]);
  }

  guardarPruebaOnline(event: Event) {
    event.preventDefault();

    if (this.pruebaOnlineForm.invalid) {
      return;
    }

    const pruebaOnline = new PruebaOnline();

    pruebaOnline.nombre = this.nombre.value;
    pruebaOnline.descripcion = this.descripcion.value;
    pruebaOnline.fechaRealizada = this.fechaRealizada.value;
    pruebaOnline.fechaFinalizada = this.fechaFinalizada.value;

    pruebaOnline.fecha = this.fecha.value;
    pruebaOnline.activa = this.activa.value;
    pruebaOnline.url = this.url.value;
    pruebaOnline.minutosExpiracion = this.minutosExpiracion.value;
    pruebaOnline.usuarioId = this.usuarioSesion.id;
    pruebaOnline.pruebaOnlineId = this.pruebaOnlineId;
    
    pruebaOnline.listaPreguntaRespuesta = this.preguntasForm.map( form => form.value);
    console.log('preguntas: ', pruebaOnline.listaPreguntaRespuesta);

    this.modo === 'INS'
      ? this.crearPruebaOnline(pruebaOnline)
      : this.editarPruebaOnline(pruebaOnline);
  }

  crearPruebaOnline(pruebaOnline: PruebaOnline) {
    this.pruebaOnlineService.createPruebaOnline(pruebaOnline).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó la prueba online exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.usuarioSesion.tipo.toLocaleLowerCase()}/pruebaonline`,
      ]);
    });
  }

  editarPruebaOnline(pruebaOnline: PruebaOnline) {
    this.pruebaOnlineService.updatePruebaOnline(pruebaOnline).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se editó la Prueba Online exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.usuarioSesion.tipo.toLocaleLowerCase()}/pruebaonline`,
      ]);
    });
  }
}
