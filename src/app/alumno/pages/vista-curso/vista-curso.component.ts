import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Actividad } from 'src/app/models/actividad.model';
import { Curso } from 'src/app/models/curso.model';
import { Material } from 'src/app/models/material.model';
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

  accionActividad(actividad: Actividad){
    console.log('actividad: ', actividad);
    switch (actividad.tipo) {
      case 'Encuesta':
        console.log('not implemented yet');
        break;
      case 'ClaseDictada':
        console.log('not implemented yet');
        break;
      case 'Trabajo':
        console.log('not implemented yet');
        break;
      case 'PruebaOnline':
        console.log('not implemented yet');
        break;

      default:
        break;
    }
  }

  descargarMaterial = (material: Material) => {
    console.log(material);

    const linkSource = `data:application/pdf;base64,${material.archivoData}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = material.archivoNombre;
    downloadLink.click();
    
  };
  calificaciones = () => console.log('not implemented yet');
}
