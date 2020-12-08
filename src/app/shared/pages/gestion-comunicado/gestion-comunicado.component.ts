import { Component, OnInit } from '@angular/core';
import { Comunicado } from 'src/app/models/Comunicado';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { ComunicadoService } from 'src/app/services/comunicado.service';

@Component({
  selector: 'app-gestion-comunicado',
  templateUrl: './gestion-comunicado.component.html',
  styleUrls: ['./gestion-comunicado.component.scss']
})
export class GestionComunicadoComponent implements OnInit {
  comunicados: Comunicado[];
  createComponent = false;
  columnas = ['nombre', 'descripcion', 'url', 'actions'];
  

  constructor(private comunicadoService: ComunicadoService) {
    this.getComunicados();
  }

  ngOnInit(): void {}

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.comunicadoService.deleteComunicado(data.id)
        .subscribe((res) => this.getComunicados());
    }
  }

  getComunicados() {
    this.comunicadoService.getComunicados().subscribe((comunicados) => {
      this.comunicados = comunicados.map((comunicado) => ({ ...comunicado, id: comunicado.comunicadoId }));
      this.createComponent = true;
    });
  }
}
