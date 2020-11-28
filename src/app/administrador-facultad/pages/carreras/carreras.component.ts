import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions } from 'src/app/models/actions.model';
import { Carrera } from 'src/app/models/carrera.model';
import { Curso } from 'src/app/models/curso.model';
import { CarreraService } from 'src/app/services/carrera.service';
import { CursoService } from 'src/app/services/curso.service';
import { SeleccionarCursoComponent } from 'src/app/shared/dialogs/seleccionar-curso/seleccionar-curso.component';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.scss'],
})
export class CarrerasComponent implements OnInit {
  actions: Actions[] = [];

  constructor(
    public dialog: MatDialog,
    private carreraService: CarreraService
  ) {}

  ngOnInit(): void {
    this.actions = [
      {
        tooltip: `Editar carrera`,
        mode: 'UPD',
        className: 'button-editar',
        tooltipClassName: 'tooltip-blue',
        icon: 'edit',
      },
      {
        tooltip: `Eliminar carrera`,
        mode: 'DLT',
        className: 'button-eliminar',
        tooltipClassName: 'tooltip-red',
        icon: 'delete',
      },
      {
        tooltip: `Agregar curso`,
        callback: this.agregarCurso,
        className: 'button-editar',
        tooltipClassName: 'tooltip-blue',
        icon: 'add',
      },
      {
        tooltip: `Quitar curso`,
        callback: this.quitarCurso,
        className: 'button-eliminar',
        tooltipClassName: 'tooltip-red',
        icon: 'remove',
      },
    ];
  }

  agregarCurso = (carrera: Carrera) => {
    const dialogRef = this.dialog.open(SeleccionarCursoComponent, {
      height: 'auto',
      width: '700px',
      data: {
        carrera,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((curso: Curso) => this.addCurso(carrera, curso));
  };

  quitarCurso = (carrera: Carrera) => {
    const dialogRef = this.dialog.open(SeleccionarCursoComponent, {
      height: 'auto',
      width: '700px',
      data: {
        carrera,
        remover: true,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((curso) => this.removeCurso(carrera, curso));
  };

  addCurso(carrera: Carrera, curso: Curso) {
    this.carreraService
      .addCurso(carrera.carreraId, curso.cursoId)
      .subscribe((res) =>
        mensajeConfirmacion(
          'Excelente!',
          `Se ha agregado el curso ${curso.nombre} a la carrera ${carrera.nombre}, exitosamente!`
        )
      );
  }

  removeCurso(carrera: Carrera, curso: Curso) {
    this.carreraService
      .removeCurso(carrera.carreraId, curso.cursoId)
      .subscribe((res) =>
        mensajeConfirmacion(
          'Excelente!',
          `Se ha quitado el curso ${curso.nombre} a la carrera ${carrera.nombre}, exitosamente!`
        )
      );
  }
}
