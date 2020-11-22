import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CursoSeccionService } from '../../../services/curso-seccion.service';

@Component({
  selector: 'app-abm-cursoseccion',
  templateUrl: './abm-cursoseccion.component.html',
  styleUrls: ['./abm-cursoseccion.component.scss']
})
export class AbmCursoseccionComponent implements OnInit {

  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();
  cursoSeccionForm: FormGroup;
  cursoSeccionId: string;

  constructor(
    private autenticacionService: AutenticacionService,
    private cursoSeccionService: CursoSeccionService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.cursoSeccionForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.router.navigate([
      `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/cursoseccion`,
    ]);
  }

}
