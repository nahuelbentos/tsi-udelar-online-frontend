import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TemaForo } from 'src/app/models/temaforo.model';
import { TemaForoService } from 'src/app/services/tema-foro.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { Location } from '@angular/common';


enum PrintMedia {
  Newspaper = 1,
  Newsletter = 5,
  Magazine = 5,
  Book = 10,
}

@Component({
  selector: 'app-abm-temaforo',
  templateUrl: './abm-temaforo.component.html',
  styleUrls: ['./abm-temaforo.component.scss'],
})
export class AbmTemaForoComponent implements OnInit {
  temaforoForm: FormGroup;
  temaforoId: string;

  get asunto() {
    return this.temaforoForm.get('asunto');
  }
  get mensaje() {
    return this.temaforoForm.get('mensaje');
  }
  get file() {
    return this.temaforoForm.get('file');
  }
  get emisor() {
    return this.temaforoForm.get('emisor');
  }
  get subrscripcionADiscusion() {
    return this.temaforoForm.get('subrscripcionADiscusion');
  }

  constructor(
    private temaforoService: TemaForoService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    // });
    // if (id) {
    //   this.temaforoService.getById(id).suscribe(temaforo => {
    //     this.asunto.setValue(temaforo.asunto);
    //     this.mensaje.setValue(temaforo.mensaje);
    //     this.file.setValue(temaforo.file);
    //     this.emisor.setValue(temaforo.emisor);
    //     this.subrscripcionADiscusion.setValue(temaforo.subrscripcionADiscusion);
    //     this.subrscripcionADiscusion.setValue(temaforo.subrscripcionADiscusion);
    //   })
    // }
  }

  private buildForm() {
    this.temaforoForm = this.fb.group({
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required],
      file: ['', Validators.required],
      emisor: ['', Validators.required],
      subrscripcionADiscusion: ['', Validators.required],
    });
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto

    this.location.back();
  }

  guardarTemaForo(event: Event) {
    event.preventDefault();

    if (this.temaforoForm.invalid) {
      return;
    }

    const temaforo = new TemaForo(this.mensaje.value);

    temaforo.asunto = this.asunto.value;
    temaforo.mensaje = this.mensaje.value;
    temaforo.file = this.file.value;
    temaforo.emisor = this.emisor.value;
    temaforo.subrscripcionADiscusion = this.subrscripcionADiscusion.value;

    this.temaforoService.createTemaForo(temaforo).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el temaforo ${this.asunto.value} exitosamente.`
      ).then();

      this.router.navigate(['gestion-temaforo']);
    });
  }
}
