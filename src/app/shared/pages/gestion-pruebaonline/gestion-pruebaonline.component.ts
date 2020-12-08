import { Component, OnInit } from '@angular/core';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { PruebaOnline } from 'src/app/models/prueba-online.model'  
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { PruebaOnlineService } from 'src/app/services/prueba-online.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-gestion-pruebaonline',
  templateUrl: './gestion-pruebaonline.component.html',
  styleUrls: ['./gestion-pruebaonline.component.scss'],
})
export class GestionPruebaonlineComponent implements OnInit {
  usuario: UsuarioSesion = this.auth.getUser();
  pruebasOnline: PruebaOnline[];
  createComponent = false;
  columnas = ['nombre', 'descripcion', 'url', 'actions'];

  constructor(private pruebaOnlineService: PruebaOnlineService, private auth: AutenticacionService) {
    this.getPruebasOnline();
  }

  ngOnInit(): void {}

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.pruebaOnlineService
        .deletePruebaOnline(data.id)
        .subscribe((res) => this.getPruebasOnline());
    }
  }

  getPruebasOnline() {
    this.pruebaOnlineService.getPruebasOnline(this.usuario.id).subscribe((pruebasOnline) => {
      this.pruebasOnline = pruebasOnline.map((pruebaOnline) => ({
        ...pruebaOnline,
        id: pruebaOnline.actividadId,
      }));
      this.createComponent = true;
    });
  }
}
