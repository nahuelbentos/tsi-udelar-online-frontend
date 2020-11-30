import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/models/curso.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-vista-curso',
  templateUrl: './vista-curso.component.html',
  styleUrls: ['./vista-curso.component.scss'],
})
export class VistaCursoComponent implements OnInit {
  cursoId: string;
  curso: Curso;
  constructor(
    private autenticacionService: AutenticacionService,
    private cursoService: CursoService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      console.log('parm:: ', param);

      this.cursoId = param.id;

      if (param.id) {
        this.cursoService.getCursoById(this.cursoId).subscribe((curso) => {
          console.log('comunicado ', curso.comunicados);

          this.curso = curso;
        });
      }
    });
  }

  calificaciones = () => console.log('not implemented yet');

  
}
