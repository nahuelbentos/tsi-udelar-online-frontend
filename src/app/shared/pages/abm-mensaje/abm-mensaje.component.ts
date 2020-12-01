import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mensaje } from 'src/app/models/mensaje.model';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { MensajeService } from 'src/app/services/mensaje.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-abm-mensaje',
  templateUrl: './abm-mensaje.component.html',
  styleUrls: ['./abm-mensaje.component.scss']
})
export class AbmMensajeComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = JSON.parse(
    localStorage.getItem('usuarioSesion')
  );
  mensajeForm: FormGroup;
  mensajeId: string;

  primeraVez = false;
  modo: string;
  hide = true;
  
  get mensaje() {
    return this.mensajeForm.get('mensaje');
  }

  constructor(
    private mensajeService: MensajeService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.mensajeId = param.id;

      if (param.id) {
        this.mensajeService
          .getMensajeById(this.mensajeId)
          .subscribe((mensaje) => this.setValuesOnForm(mensaje));
      }
    });
  }

  private setValuesOnForm(mensaje: Mensaje) {
    this.mensaje.setValue(mensaje.contenido);
  }

  private buildForm() {
    this.mensajeForm = this.fb.group({
      mensaje: ['', Validators.required],
    });
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.router.navigate([
      `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/mensaje`,
    ]);
  }

  guardarMensaje(event: Event) {
    event.preventDefault();

    if (this.mensajeForm.invalid) {
      return;
    }

    const mensaje = new Mensaje();

    mensaje.mensajeId = this.mensajeId;
    mensaje.emisorId = this.usuarioLogueado.id;
    mensaje.contenido = this.mensaje.value;
    mensaje.fechaDeEnviado = new Date();

    this.modo === 'INS'
      ? this.crearMensaje(mensaje)
      : this.editarMensaje(mensaje);
  }

  private crearMensaje = (mensaje: Mensaje) =>
    this.mensajeService.createMensaje(mensaje).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el mensaje ${this.mensaje.value} exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/mensaje`,
      ]);
    })

  private editarMensaje = (mensaje: Mensaje) =>
    this.mensajeService.updateMensaje(mensaje).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se modificó el mensaje ${this.mensaje.value} exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/mensaje`,
      ]);
    })
}
