import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeTema } from 'src/app/models/mensajeTema';
import { TemaForo } from 'src/app/models/temaforo.model';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { MensajetemaService } from 'src/app/services/mensajetema.service';
import { TemaForoService } from 'src/app/services/tema-foro.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-abm-mensajetema',
  templateUrl: './abm-mensajetema.component.html',
  styleUrls: ['./abm-mensajetema.component.scss']
})
export class AbmMensajetemaComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();
  mensajeTemaForm: FormGroup;
  mensajeId: string;
  temasForos: TemaForo[] = [];
  primeraVez = false;
  modo: string;
  hide = true;

  get contenido() {
    return this.mensajeTemaForm.get('contenido');
  }

  get mensajeBloqueado(){
    return this.mensajeTemaForm.get('mensajeBloqueado');
  }

  get temaForo(){
    return this.mensajeTemaForm.get('temaForo');
  }


  constructor(
    private autenticacionService: AutenticacionService,
    private temaForoService: TemaForoService,
    private usuarioService: UsuarioService,
    private mensajeTemaService: MensajetemaService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.mensajeTemaForm = this.fb.group({
      contenido: ['', Validators.required],
      mensajeBloqueado: [''],
      temaForo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.temaForoService.getTemasForos().subscribe((temasForos) => (this.temasForos = temasForos));
    
    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.mensajeId = param.id;
      console.log('param ', param);
      console.log('param.id ', param.id);
      console.log('this.mensajeId ', this.mensajeId);
      if (param.id) {
        this.mensajeTemaService
          .getMensajeTemaById(this.mensajeId)
          .subscribe((mensajeTema) => this.setValuesOnForm(mensajeTema));
      }
    });
  }

  private setValuesOnForm(mensajeTema: MensajeTema) {
    this.contenido.setValue(mensajeTema.contenido);
    this.mensajeBloqueado.setValue(mensajeTema.mensajeBloqueado);
    this.temaForo.setValue(mensajeTema.temaForoId);
    console.log('this.contenido ', this.contenido);
    console.log('this.mensajeBloqueado ', this.mensajeBloqueado);
    console.log('this.temaForo ', this.temaForo);
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.router.navigate(['/administrador/mensajetema']);
  }

  guardarMensajeTema(event: Event) {
    event.preventDefault();

    if (this.mensajeTemaForm.invalid) {
      return;
    }

    const mensajeTema = new MensajeTema(this.contenido.value);
    mensajeTema.emisorId = this.usuarioLogueado.id;
    mensajeTema.contenido = this.contenido.value;
    mensajeTema.mensajeBloqueado = this.mensajeBloqueado.value ? this.mensajeBloqueado.value : false;
    mensajeTema.temaForoId = this.temaForo.value.temaForoId;
    mensajeTema.fechaDeEnviado = new Date();
    mensajeTema.mensajeId = this.mensajeId;
    console.log('this.usuarioLogueado ', this.usuarioLogueado);
    console.log('mensajeTema.contenido ', mensajeTema.contenido);
    console.log('mensajeTema.usuarioId ', mensajeTema.emisorId);
    console.log('mensajeTema.mensajeBloqueado ', mensajeTema.mensajeBloqueado);
    console.log('mensajeTema.temaForoId ', mensajeTema.temaForoId);
    console.log('mensajeTema.fechaDeEnviado ', mensajeTema.fechaDeEnviado);
    console.log('mensajeTema ' , mensajeTema);
    this.modo === 'INS' ? this.crearMensajeTema(mensajeTema) : this.editarMensajeTema(mensajeTema);
  }


private crearMensajeTema = (mensajeTema: MensajeTema) =>
  this.mensajeTemaService.createMensajeTema(mensajeTema).subscribe(() => {
    mensajeConfirmacion(
      'Excelente!',
      `Se creó el mensaje tema exitosamente.`
    ).then();
    this.router.navigate(['/administrador/mensajetema']);
  })


private editarMensajeTema = (mensajetema: MensajeTema) =>
  this.mensajeTemaService.updateMensajeTema(mensajetema).subscribe(() => {
    mensajeConfirmacion(
      'Excelente!',
      `Se modificó el mensaje tema exitosamente.`
    ).then();
    this.router.navigate(['/administrador/mensajetema']);
  })

}
