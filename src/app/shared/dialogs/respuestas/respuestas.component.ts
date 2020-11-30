import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Actividad } from 'src/app/models/actividad.model';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.scss']
})
export class RespuestasComponent implements OnInit {
  encuesta: Actividad;
  step = 0;
  primeraVez = true;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(
    private actividadService: ActividadService,
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
      this.actividadService
      .getEncuestaById(this.data.actividadId)
      .subscribe((encuesta) => this.encuesta = encuesta);
  }


  setStep(index: number) {
    this.step = index;
    this.primeraVez = false;
  }

  nextStep = () => this.step >= this.encuesta.preguntaLista.length - 1 ? this.step = this.encuesta.preguntaLista.length - 1 :  this.step++;

  prevStep = () => this.step <= 0 ? this.step = 0 :  this.step--;

}
