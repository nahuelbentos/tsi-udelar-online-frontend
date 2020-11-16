import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comunicado } from 'src/app/models/Comunicado';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { ComunicadoService } from 'src/app/services/comunicado.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-abm-comunicado',
  templateUrl: './abm-comunicado.component.html',
  styleUrls: ['./abm-comunicado.component.scss']
})
export class AbmComunicadoComponent implements OnInit {
  comunicadoForm: FormGroup;
  comunicadoId: string;

  primeraVez = false;
  modo: string;
  hide = true;

  get nombre() {
    return this.comunicadoForm.get('nombre');
  }

  get descripcion() {
    return this.comunicadoForm.get('descripcion');
  }

  get url() {
    return this.comunicadoForm.get('url');
  }

  constructor(
    private usuarioService: UsuarioService,
    private comunicadoService: ComunicadoService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.comunicadoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      url: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.comunicadoId = param.id;

      if (param.id) {
        this.comunicadoService
          .getComunicadoById(this.comunicadoId)
          .subscribe((comunicado) => this.setValuesOnForm(comunicado));
      }
    });
  }

  private setValuesOnForm(comunicado: Comunicado) {
    this.nombre.setValue(comunicado.nombre);
    this.descripcion.setValue(comunicado.descripcion);
    this.url.setValue(comunicado.url);
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.router.navigate(['/administrador/comunicado']);
  }

  guardarComunicado(event: Event) {
    event.preventDefault();

    if (this.comunicadoForm.invalid) {
      return;
    }
    const usuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion'));
    const comunicado = new Comunicado(this.nombre.value, this.descripcion.value, this.url.value);
    console.log(' JSON usuarioSesion', JSON.parse(localStorage.getItem('usuarioSesion')));
    console.log('usuarioSesion', localStorage.getItem('usuarioSesion').toString());
    console.log('usuarioSesion variable ', usuarioSesion.toString());
    console.log('usuarioSesion.CI ', usuarioSesion.ci);
    console.log('usuarioSesion.userName ', usuarioSesion.userName);
    comunicado.usuarioEmail = usuarioSesion.email;
    comunicado.descripcion = this.descripcion.value;
    comunicado.nombre = this.nombre.value;
    comunicado.url = this.url.value;
    comunicado.comunicadoId = this.comunicadoId;

    this.modo === 'INS' ? this.crearComunicado(comunicado) : this.editarComunicado(comunicado);
  }


private crearComunicado = (comunicado: Comunicado) =>
  this.comunicadoService.createComunicado(comunicado).subscribe(() => {
    mensajeConfirmacion(
      'Excelente!',
      `Se creó el comunicado ${this.nombre.value} exitosamente.`
    ).then();
    this.router.navigate(['/administrador/comunicado']);
  })


private editarComunicado = (comunicado: Comunicado) =>
  this.comunicadoService.updateComunicado(comunicado).subscribe(() => {
    mensajeConfirmacion(
      'Excelente!',
      `Se modificó el curso ${this.nombre.value} exitosamente.`
    ).then();
    this.router.navigate(['/administrador/comunicado']);
  })
}
