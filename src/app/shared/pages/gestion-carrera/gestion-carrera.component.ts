import { Component, Input, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-gestion-carrera',
  templateUrl: './gestion-carrera.component.html',
  styleUrls: ['./gestion-carrera.component.scss'],
})
export class GestionCarreraComponent implements OnInit {
  usuario: UsuarioSesion = this.auth.getUser();
  carreras: Carrera[];
  createComponent = false;
  columnas = ['nombre', 'descripcion', 'actions'];
  @Input() actions = null;

  constructor(
    private carreraService: CarreraService,
    private auth: AutenticacionService
  ) {
    this.getCarreras();
  }

  ngOnInit(): void {
    console.log('actions 22 ', this.actions);
  }

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.carreraService
        .deleteCarrera(data.id)
        .subscribe((res) => this.getCarreras());
    }
  }

  getCarreras() {
    if (this.usuario.tipo === TipoUsuario.Administrador) {
      this.carreraService
        .getCarreras()
        .subscribe(
          (carreras) =>
            (this.carreras = carreras.map((carrera) => ({
              ...carrera,
              id: carrera.carreraId,
            })))
        );
    } else {
      this.carreraService
        .getCarreraByfacultad(this.usuario.facultad.facultadId)
        .subscribe(
          (carreras) =>
            (this.carreras = carreras.map((carrera) => ({
              ...carrera,
              id: carrera.carreraId,
            })))
        );
    }
  }
}
