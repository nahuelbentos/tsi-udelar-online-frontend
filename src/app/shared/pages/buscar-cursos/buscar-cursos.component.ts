import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-buscar-cursos',
  templateUrl: './buscar-cursos.component.html',
  styleUrls: ['./buscar-cursos.component.scss'],
})
export class BuscarCursosComponent implements OnInit {
  search: string;
  cursos: Curso[] = [];
  step = 0;
  primeraVez = true;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.search = param.search;

      this.cursoService.getCursosByFilter(this.search).subscribe((cursos) => {
        // this.accordion.closeAll();
        this.cursos = cursos;
      });
    });
  }

  setStep(index: number) {
    this.step = index;
    this.primeraVez = false;
  }

  nextStep = () => this.step >= this.cursos.length - 1 ? this.step = this.cursos.length - 1 :  this.step++;

  prevStep = () => this.step <= 0 ? this.step = 0 :  this.step--;
}
