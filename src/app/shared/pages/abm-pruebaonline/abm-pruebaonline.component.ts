import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PruebaOnline } from 'src/app/models/prueba-online.model';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { PruebaOnlineService } from 'src/app/services/prueba-online.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-abm-pruebaonline',
  templateUrl: './abm-pruebaonline.component.html',
  styleUrls: ['./abm-pruebaonline.component.scss']
})
export class AbmPruebaonlineComponent implements OnInit {
  usuarioLogueado: UsuarioSesion =  this.autenticacionService.getUser();
  pruebaOnlineForm: FormGroup;
  pruebaOnlineId: string;
  modo: string;

  get url() {
    return this.pruebaOnlineForm.get('url');
  }
  get minutosExpiracion() {
    return this.pruebaOnlineForm.get('minutosExpiracion');
  }
  get fecha() {
    return this.pruebaOnlineForm.get('fecha');
  }
  get activa() {
    return this.pruebaOnlineForm.get('activa');
  }

  constructor( 
    private autenticacionService: AutenticacionService,
    private pruebaOnlineService: PruebaOnlineService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm(); 
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.pruebaOnlineId = param.id;

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
    this.activa.setValue(pruebaOnline.activa);
    this.minutosExpiracion.setValue(pruebaOnline.minutosExpiracion);
    this.url.setValue(pruebaOnline.url);
    this.fecha.setValue(pruebaOnline.fecha);
  }

  private buildForm() {
    this.pruebaOnlineForm = this.fb.group({
      minutosExpiracion: ['', Validators.required],
      url: ['', Validators.required],
      activa: [false],
      fecha:[""]
    });
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

    pruebaOnline.activa = this.activa.value;
    pruebaOnline.minutosExpiracion = this.minutosExpiracion.value;
    pruebaOnline.url = this.url.value;
    pruebaOnline.fecha = this.fecha.value;
    pruebaOnline.usuarioId = this.usuarioLogueado.id;

    this.modo === 'INS'
    ? this.crearPruebaOnline(pruebaOnline)
    : this.editarPruebaOnline(pruebaOnline);
    
  }

  crearPruebaOnline(pruebaOnline : PruebaOnline) {
    this.pruebaOnlineService.createPruebaOnline(pruebaOnline).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó la preuba online exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/pruebaonline`,
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
        `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/pruebaonline`,
      ]);
    });
  }

}
