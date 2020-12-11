import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeTema } from 'src/app/models/mensajeTema';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { MensajetemaService } from 'src/app/services/mensajetema.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-responder-tema-foro',
  templateUrl: './responder-tema-foro.component.html',
  styleUrls: ['./responder-tema-foro.component.scss'],
})
export class ResponderTemaForoComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = this.auth.getUser();
  mensajeTemaForm: FormGroup;

  temaForoId: string;
  foroId: string;
  titulo: string;

  get contenido() {
    return this.mensajeTemaForm.get('contenido');
  }

  constructor(
    private location: Location,
    private auth: AutenticacionService,
    private mensajeTemaService: MensajetemaService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.temaForoId = data.temaForoId;
    this.foroId = data.foroId;
    this.titulo = data.titulo;
    this.buildForm();
  }

  private buildForm() {
    this.mensajeTemaForm = this.fb.group({
      contenido: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  guardarMensajeTema(event: Event) {
    event.preventDefault();

    if (this.mensajeTemaForm.invalid) {
      return;
    }

    const mensajeTema = new MensajeTema();
    mensajeTema.emisorId = this.usuarioLogueado.id;
    mensajeTema.contenido = this.contenido.value;
    mensajeTema.mensajeBloqueado = false;
    mensajeTema.temaForoId = this.temaForoId;
    mensajeTema.fechaDeEnviado = new Date();
    
    console.log('mensajeTema ', mensajeTema);  
     this.crearMensajeTema(mensajeTema); 
  }

  private crearMensajeTema = (mensajeTema: MensajeTema) =>
    this.mensajeTemaService.createMensajeTema(mensajeTema).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó la respuesta exitosamente.`
      ).then( () =>  this.dialogRef.close());
    });
}
