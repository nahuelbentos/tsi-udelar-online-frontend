import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoCurso } from 'src/app/models/alumno-curso.model';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AlumnoCursoService } from 'src/app/services/alumno-curso.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CursoService } from 'src/app/services/curso.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-abm-alumnocurso',
  templateUrl: './abm-alumnocurso.component.html',
  styleUrls: ['./abm-alumnocurso.component.scss']
})
export class AbmAlumnocursoComponent implements OnInit {

  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();
  alumnoCursoForm: FormGroup;
  alumnos : any;
  cursos : any;
  alumnoId: any;
  cursoId: any;
  primeraVez = false;
  modo: string;
  hide = true;
  alumnoCursoId : any;


  get alumno() {
    return this.alumnoCursoForm.get('alumno');
  }

  get curso() {
    return this.alumnoCursoForm.get('curso');
  }

  get inscripto(){
    return this.alumnoCursoForm.get('inscripto');
  }

  get calificacion(){
    return this.alumnoCursoForm.get('calificacion');
  }

  get feedback(){
    return this.alumnoCursoForm.get('feedback');
  }

  get fechaActCerrada(){
    return this.alumnoCursoForm.get('fechaActCerrada');
  }

  constructor(
    private autenticacionService: AutenticacionService,
    private alumnoCursoService: AlumnoCursoService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private cursoService : CursoService,
    private alumnoService : UsuarioService
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
    this.cursoService
    .getCursos()
    .subscribe((cursos) => (this.cursos = cursos));
    this.alumnoService
    .getUsuarios()
    .subscribe((alumnos) => (this.alumnos = alumnos));
    
    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.alumnoCursoId = param.id;

      if (param.id) {
        this.alumnoCursoService
          .getAlumnoCursoById(this.alumnoCursoId)
          .subscribe((alumnoCurso) => this.setValuesOnForm(alumnoCurso));
      }
    });
  }


  private setValuesOnForm(alumnoCurso: AlumnoCurso) {
    this.curso.setValue(alumnoCurso.cursoId);
    this.alumno.setValue(alumnoCurso.alumnoId);
    this.inscripto.setValue(alumnoCurso.calificacion);
    this.calificacion.setValue(alumnoCurso.calificacion);
    this.feedback.setValue(alumnoCurso.feedback);
    this.fechaActCerrada.setValue(alumnoCurso.fechaActCerrada);
  }

  private buildForm() {
    this.alumnoCursoForm = this.fb.group({
      calificacion: ['',Validators.required],
      feedback: ['',Validators.required],
      inscripto: [false],
      fechaActCerrada: ['']
    });
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.router.navigate([
      `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/alumnocurso`,
    ]);
  }

  guardarAlumnoCurso(event: Event) {
    event.preventDefault();

    if (this.alumnoCursoForm.invalid) {
      return;
    }

    const alumnoCurso = new AlumnoCurso();
    const alumno: Usuario = this.alumno.value;
    alumnoCurso.alumnoId = alumno.usuarioId;
    alumnoCurso.cursoId = this.cursoId.value;
    alumnoCurso.calificacion = this.calificacion.value;
    alumnoCurso.inscripto = this.inscripto.value;
    alumnoCurso.feedback = this.feedback.value;
    alumnoCurso.fechaActCerrada = this.fechaActCerrada.value;

    this.modo === 'INS'
      ? this.crearAlumnoCurso(alumnoCurso)
      : this.editarAlumnoCurso(alumnoCurso);
  }

  crearAlumnoCurso(alumnoCurso: AlumnoCurso) {
    this.alumnoCursoService.createAlumnoCurso(alumnoCurso).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el alumno curso exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/alumnocurso`,
      ]);
    });
  }

  editarAlumnoCurso(alumnoCurso: AlumnoCurso) {
    this.alumnoCursoService.updateAlumnoCurso(alumnoCurso).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se edito el el alumno curso exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/alumnocurso`,
      ]);
    });
  }

}
