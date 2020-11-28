import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoSeccion } from 'src/app/models/curso-seccion.model';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CursoService } from 'src/app/services/curso.service';
import { CursoSeccionService } from '../../../services/curso-seccion.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { SeccionService } from 'src/app/services/seccion.service';

@Component({
  selector: 'app-abm-cursoseccion',
  templateUrl: './abm-cursoseccion.component.html',
  styleUrls: ['./abm-cursoseccion.component.scss']
})
export class AbmCursoseccionComponent implements OnInit {

  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();
  cursoSeccionForm: FormGroup;
  cursoSeccionId: string;
  secciones: any;
  cursos : any;
  primeraVez = false;
  modo: string;
  hide = true;

  get secccion() {
    return this.cursoSeccionForm.get('seccion');
  }

  get curso() {
    return this.cursoSeccionForm.get('curso');
  }

  constructor(
    private autenticacionService: AutenticacionService,
    private cursoSeccionService: CursoSeccionService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private cursoService : CursoService,
    private seccionService : SeccionService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.cursoService
    .getCursos()
    .subscribe((cursos) => (this.cursos = cursos));
    this.seccionService
    .getSecciones()
    .subscribe((secciones) => (this.secciones = secciones));
    
    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.cursoSeccionId = param.id;

      if (param.id) {
        this.cursoSeccionService
          .getCursoSeccionById(this.cursoSeccionId)
          .subscribe((cursoSeccion) => this.setValuesOnForm(cursoSeccion));
      }
    });
  }

  private setValuesOnForm(cursoSeccion: CursoSeccion) {
    this.curso.setValue(cursoSeccion.CursoId);
    this.secccion.setValue(cursoSeccion.SeccionId);
  }

  private buildForm() {
    this.cursoSeccionForm = this.fb.group({
    });
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.router.navigate([
      `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/cursoseccion`,
    ]);
  }

  guardarCursoSeccion(event: Event) {
    event.preventDefault();

    if (this.cursoSeccionForm.invalid) {
      return;
    }

    const cursoSeccion = new CursoSeccion();
    cursoSeccion.CursoId = this.curso.value;
    cursoSeccion.SeccionId = this.secccion.value;

    this.modo === 'INS'
      ? this.crearCursoSeccion(cursoSeccion)
      : this.editarCursoSeccion(cursoSeccion);
  }

  crearCursoSeccion(cursoSeccion: CursoSeccion) {
    this.cursoSeccionService.createCursoSeccion(cursoSeccion).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el curso seccion exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/cursoseccion`,
      ]);
    });
  }

  editarCursoSeccion(cursoSeccion: CursoSeccion) {
    this.cursoSeccionService.updateCursoSeccion(cursoSeccion).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se editó el curso seccion exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/cursoseccion`,
      ]);
    });
  }

}
