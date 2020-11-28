import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Respuesta } from 'src/app/models/respuesta.model';
import { RespuestaService } from 'src/app/services/respuesta.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

enum PrintMedia {
  Newspaper = 1,
  Newsletter = 5,
  Magazine = 5,
  Book = 10,
}

@Component({
  selector: 'app-abm-respuesta',
  templateUrl: './abm-respuesta.component.html',
  styleUrls: ['./abm-respuesta.component.scss']
})
export class AbmRespuestaComponent implements OnInit {
  respuestaForm: FormGroup;
  respuestaId: string;

  get mensaje() {
    return this.respuestaForm.get('mensaje');
  }

  get usuario() {
    return this.respuestaForm.get('usuario');
  }


  constructor(
    private respuestaService: RespuestaService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    // this.route.params.subscribe(params => {

    // });
    // if (id) {
    //   this.respuestaService.getById(id).suscribe(respuesta => {

    //     this.usuario.setValue(respuesta.usuario);
    //     this.mensaje.setValue(respuesta.mensaje);
    //   })
    // }
  }

  private buildForm() {
    this.respuestaForm = this.fb.group({
      mensaje: ['', Validators.required],
    });
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.router.navigate(['/docente/respuesta']);
  }

  guardarRespuesta(event: Event) {
    event.preventDefault();

    if (this.respuestaForm.invalid) {
      return;
    }

    // const respuesta = new Respuesta(this.mensaje.value,this.usuario.value);

    // respuesta.mensaje = this.mensaje.value;

    // this.respuestaService.createRespuesta(respuesta).subscribe(() => {
    //   mensajeConfirmacion(
    //     'Excelente!',
    //     `Se creó la respuesta ${this.mensaje.value} exitosamente.`
    //   ).then();
    //   this.router.navigate(['gestion-respuesta']);
    // });
  }

}
