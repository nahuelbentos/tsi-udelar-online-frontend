import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from 'src/app/models/actions.model';
import { AlumnoPruebaOnline } from 'src/app/models/alumno-prueba-online.model';
import { PruebaOnline } from 'src/app/models/prueba-online.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { PruebaOnlineService } from 'src/app/services/prueba-online.service';
import { SeleccionarPruebasOnlineComponent } from 'src/app/shared/dialogs/seleccionar-pruebas-online/seleccionar-pruebas-online.component';

@Component({
  selector: 'app-administrar-pruebas-online',
  templateUrl: './administrar-pruebas-online.component.html',
  styleUrls: ['./administrar-pruebas-online.component.scss']
})
export class AdministrarPruebasOnlineComponent implements OnInit {
  usuarioLogueado = this.auth.getUser();
  //tipo = TipoUsuario.Alumno;
  pruebasOnline: PruebaOnline[] = [];
  pruebaOnlineDialog = SeleccionarPruebasOnlineComponent;
  verAlumnos = false;
  alumnos: AlumnoPruebaOnline[];

  actions: Actions[] = [];
  actionsHeader: Actions[] = [{}];

  columnas = ['alumno', 'evaluacion', 'nota', 'actions'];

  constructor(
    private pruebaOnlineService: PruebaOnlineService,
    private auth: AutenticacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.pruebaOnlineService
      .getPruebasOnline(this.usuarioLogueado.id)
      .subscribe((pruebasOnline) => {
        this.pruebasOnline = pruebasOnline.map((pruebaOnline) => ({
          ...pruebaOnline,
          descripcionAutocomplete: pruebaOnline.nombre,
        }));
      });

    // this.actions = [
    //   {
    //     tooltip: `Editar calificación`,
    //     className: 'button-editar',
    //     tooltipClassName: 'tooltip-blue',
    //     icon: 'edit',
    //     callback: this.editarCalificacion,
    //   },
    // ];
  }

  getItem(pruebaOnline: PruebaOnline) {
    console.log('getIsssstem:: ', pruebaOnline);
    this.pruebaOnlineService
      .GetAlumnoPruebaOnlineByPruebaOnline(pruebaOnline.actividadId)
      .subscribe((alumnos) => {
        console.log('alumnos:: ', alumnos);
        this.verAlumnos = true;
        this.alumnos = alumnos;
      });
  }

  // editarCalificacion = (calificacion: AlumnoCurso) => {
  //   const params = {
  //     alumnoId: calificacion.alumnoId,
  //     cursoId: calificacion.cursoId,
  //   };

  //   this.router.navigate([`abm-alumnocurso`], {
  //     queryParams: params,
  //     relativeTo: this.route,
  //   });
  // };
}
