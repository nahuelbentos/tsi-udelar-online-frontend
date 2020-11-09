import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrera } from 'src/app/models/carrera.model';
import { Facultad } from 'src/app/models/facultad.model';
import { Foro } from 'src/app/models/foro.model';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { ForoService } from 'src/app/services/foro.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-abm-foro',
  templateUrl: './abm-foro.component.html',
  styleUrls: ['./abm-foro.component.scss']
})
export class AbmForoComponent implements OnInit {
 usuarioLogueado: UsuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion'));
  foroForm: FormGroup;
  foroId: string;

  primeraVez = false;
  modo: string;
  hide = true;

  facultades: Facultad[] = [];

  get titulo() {
    return this.foroForm.get('titulo');
  }

  get descripcion() {
    return this.foroForm.get('descripcion');
  }

  constructor(
    private foroService: ForoService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {


    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.foroId = param.id;

      if (param.id) {
        this.foroService
          .getForoById(this.foroId)
          .subscribe((foro) => this.setValuesOnForm(foro));
      }
    });
  }

  private setValuesOnForm(foro: Foro) {
    this.titulo.setValue(foro.titulo);
    this.descripcion.setValue(foro.descripcion);
    
  }

  private buildForm() {
    this.foroForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.router.navigate([
      `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/carrera`,
    ]);
  }

  guardarForo(event: Event) {
    event.preventDefault();

    if (this.foroForm.invalid) {
      return;
    }

    const foro = new Foro(this.titulo.value);

    foro.foroId = this.foroId;
    foro.titulo = this.titulo.value;
    foro.descripcion = this.descripcion.value;
    

    this.modo === 'INS'
      ? this.crearForo(foro)
      : this.editarForo(foro);
  }

  private crearForo = (foro: Foro) =>
    this.foroService.createForo(foro).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el foro ${this.titulo.value} exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/foro`,
      ]);
    })

  private editarForo = (foro: Foro) =>
    this.foroService.updateForo(foro).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se modificó el foro ${this.titulo.value} exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/foro`,
      ]);
    })
}
