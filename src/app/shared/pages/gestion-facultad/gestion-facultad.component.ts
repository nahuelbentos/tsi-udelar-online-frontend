import { Component, Input, OnInit } from '@angular/core';
import { Facultad } from 'src/app/models/facultad.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { FacultadService } from 'src/app/services/facultad.service';
import { Actions } from 'src/app/models/actions.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';

@Component({
  selector: 'app-gestion-facultad',
  templateUrl: './gestion-facultad.component.html',
  styleUrls: ['./gestion-facultad.component.scss'],
})
export class GestionFacultadComponent implements OnInit {
  usuarioSesion = this.autenticacionService.getUser();
  facultades: Facultad[];
  createComponent = false;
  columnas = ['nombre', 'descripcion', 'urlAcceso', 'actions'];

  @Input() actionsHeader: Actions[] = null; //[{}];
  @Input() actions: Actions[] = null; //[{}];

  constructor(
    private facultadService: FacultadService,
    private autenticacionService: AutenticacionService
  ) {
    this.getFacultades();
  }

  ngOnInit(): void {}

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      // Llamamos al backend para eliminar el registro.
      this.facultadService
        .deleteFacultad(data.id)
        .subscribe((res) => this.getFacultades());
    }
  }

  getFacultades() {
    this.usuarioSesion.tipo === TipoUsuario.Administrador
      ? this.facultadService.getFacultades().subscribe((facultades) => {
          this.facultades = facultades.map((facultad) => ({
            ...facultad,
            id: facultad.facultadId,
          }));
        })
      : (this.facultades = this.selfFacultad(this.usuarioSesion.facultad));
  }

  mensaje(param) {
    console.log('otyro mensaje', param);
  }

  selfFacultad(facu: Facultad): Facultad[] {
    const facultad = { ...facu, id: facu.facultadId };
    const facultades: Facultad[] = [];
    facultades.push(facultad);

    return facultades;
  }
}
