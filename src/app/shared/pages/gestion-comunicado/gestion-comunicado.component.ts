import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Comunicado } from 'src/app/models/Comunicado';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ComunicadoService } from 'src/app/services/comunicado.service';

@Component({
  selector: 'app-gestion-comunicado',
  templateUrl: './gestion-comunicado.component.html',
  styleUrls: ['./gestion-comunicado.component.scss']
})
export class GestionComunicadoComponent implements OnInit, OnChanges {
  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();
  comunicados: Comunicado[];
  createComponent = false;
  columnas = ['nombre', 'descripcion', 'url', 'actions'];
  

  @Input() actions = null;

  constructor(
    private comunicadoService: ComunicadoService,
    private autenticacionService: AutenticacionService,
    ) {
    if (this.usuarioLogueado.rol === 'AdministradorFacultad'){
      this.GetComunicadosByFacultadId(this.usuarioLogueado.facultad.facultadId);
      console.log("AdministradorFacultad ");
      
    }else{
      console.log("Administrador ");
      this.getComunicados();
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
  }
  

  ngOnInit(): void {
    console.log("actions ", this.actions);
    
  }

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.comunicadoService.deleteComunicado(data.id)
        .subscribe((res) => {
          if (this.usuarioLogueado.rol === 'AdministradorFacultad'){
            this.GetComunicadosByFacultadId(this.usuarioLogueado.facultad.facultadId);
          }else{
            this.getComunicados();
          }});
    }
  }

  getComunicados() {
    this.comunicadoService.getComunicados().subscribe((comunicados) => {
      this.comunicados = comunicados.map((comunicado) => ({ ...comunicado, id: comunicado.comunicadoId }));
      this.createComponent = true;
    });
  }

  GetComunicadosByFacultadId(facultadId: string) {
    this.comunicadoService.GetComunicadosByFacultadId(facultadId).subscribe((comunicados) => {
      this.comunicados = comunicados.map((comunicado) => ({ ...comunicado, id: comunicado.comunicadoId }));
      this.createComponent = true;
    });
  }
}
