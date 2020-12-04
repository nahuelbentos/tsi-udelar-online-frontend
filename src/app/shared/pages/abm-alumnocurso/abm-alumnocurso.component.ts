import { Location } from '@angular/common';
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
 

  get calificacion(){
    return this.alumnoCursoForm.get('calificacion');
  }

  get feedback(){
    return this.alumnoCursoForm.get('feedback');
  }

  get fechaActaCerrada(){
    return this.alumnoCursoForm.get('fechaActaCerrada');
  }

  constructor(
    private autenticacionService: AutenticacionService,
    private alumnoCursoService: AlumnoCursoService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private cursoService : CursoService,
    private alumnoService : UsuarioService,
    private location: Location
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
    // this.cursoService
    // .getCursos()
    // .subscribe((cursos) => (this.cursos = cursos));
    // this.alumnoService
    // .getUsuariosByTipo("Alumno")
    // .subscribe((alumnos) => (this.alumnos = alumnos));
    
    this.route.queryParams.subscribe((param) => { 
      this.alumnoId = param.alumnoId;
      this.cursoId = param.cursoId;

      if (param.alumnoId && param.cursoId) {
        this.alumnoCursoService
          .getAlumnoCursoById(this.alumnoId, this.cursoId)
          .subscribe((alumnoCurso) => this.setValuesOnForm(alumnoCurso));
      }
    });
  }


  private setValuesOnForm(alumnoCurso: AlumnoCurso) {
    console.log('pasa aca');
    
    this.curso.setValue( `${alumnoCurso.dataCurso.nombre} - ${alumnoCurso.dataCurso.descripcion}`);
    this.alumno.setValue(`${alumnoCurso.dataAlumno.nombres} - ${alumnoCurso.dataAlumno.apellidos} `);
    this.calificacion.setValue(alumnoCurso.calificacion);
    this.feedback.setValue(alumnoCurso.feedback);
    this.fechaActaCerrada.setValue(alumnoCurso.fechaActaCerrada);

    this.curso.disable();
    this.alumno.disable();
    this.fechaActaCerrada.disable();
  }

  private buildForm() {
    this.alumnoCursoForm = this.fb.group({
      curso: [''],
      alumno: [''],
      calificacion: [''],
      feedback: [''], 
      fechaActaCerrada: [''],
    });
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.location.back();
  }

  guardarAlumnoCurso(event: Event) {
    event.preventDefault();

    if (this.alumnoCursoForm.invalid) {
      return;
    }

    const alumnoCurso = new AlumnoCurso(); 

    alumnoCurso.alumnoId = this.alumnoId;
    alumnoCurso.cursoId = this.cursoId;
    alumnoCurso.calificacion = this.calificacion.value;
    alumnoCurso.feedback = this.feedback.value;
    
    this.editarAlumnoCurso(alumnoCurso);
  }


  editarAlumnoCurso(alumnoCurso: AlumnoCurso) {
    this.alumnoCursoService.updateAlumnoCurso(alumnoCurso).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se edito el el alumno curso exitosamente.`
      ).then( res => this.location.back());
      
    });
  }

}
