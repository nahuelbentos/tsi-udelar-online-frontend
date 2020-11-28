import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Comunicado } from 'src/app/models/Comunicado';
import { ComunicadoFacultad } from 'src/app/models/comunicado-facultad';
import { Facultad } from 'src/app/models/facultad.model';
import { TemplateCurso } from 'src/app/models/template-curso.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ComunicadoService } from 'src/app/services/comunicado.service';
import { FacultadService } from 'src/app/services/facultad.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { SeleccionarComunicadoComponent } from '../../dialogs/seleccionar-comunicado/seleccionar-comunicado.component';
import { SeleccionarFacultadComponent } from '../../dialogs/seleccionar-facultad/seleccionar-facultad.component';

@Component({
  selector: 'app-abm-publicarcomunicado',
  templateUrl: './abm-publicarcomunicado.component.html',
  styleUrls: ['./abm-publicarcomunicado.component.scss'],
})
export class AbmPublicarcomunicadoComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();
  publicarComunicadoForm: FormGroup;
  comunicadoId: string;
  filteredComunicados: Observable<Comunicado[]>;
  comunicados: Comunicado[] = [];
  filteredFacultades: Observable<Facultad[]>;
  facultades: Facultad[] = [];

  primeraVez = false;
  modo: string;
  hide = true;

  @Input() tipo: TipoUsuario = null;

  get comunicado() {
    return this.publicarComunicadoForm.get('comunicado');
  }

  get facultad() {
    return this.publicarComunicadoForm.get('facultad');
  }

  constructor(
    private autenticacionService: AutenticacionService,
    private comunicadoService: ComunicadoService,
    private facultadService: FacultadService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.comunicadoService
      .getComunicados()
      .subscribe((comunicados) => this.setComunicados(comunicados));
    this.facultadService
      .getFacultades()
      .subscribe((facultades) => this.setFacultades(facultades));

    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.comunicadoId = param.id;
      if (param.id) {
        this.comunicadoService
          .getComunicadoById(this.comunicadoId)
          .subscribe((comunicado) => this.setValuesOnForm(comunicado));
      }
    });
  }

  setComunicados(comunicados: Comunicado[]) {
    this.comunicados = comunicados;

    this.filteredComunicados = this.comunicado.valueChanges.pipe(
      startWith(''),
      map((comunicado: Comunicado) =>
        comunicado
          ? this.filterComunicados(comunicado)
          : this.comunicados.slice()
      )
    );
  }

  setFacultades(facultades: Facultad[]) {
    this.facultades = facultades;

    this.filteredFacultades = this.facultad.valueChanges.pipe(
      startWith(''),
      map((facultad: Facultad) =>
        facultad ? this.filterFacultades(facultad) : this.facultades.slice()
      )
    );
  }

  private filterComunicados(value: any): Comunicado[] {
    const filterValue = value.toLowerCase();

    return this.comunicados.filter((comunicado) =>
      comunicado.nombre.toLowerCase().includes(filterValue)
    );
  }

  private filterFacultades(value: any): Facultad[] {
    const filterValue = value.toLowerCase();

    return this.facultades.filter((facultad) =>
      facultad.nombre.toLowerCase().includes(filterValue)
    );
  }

  private setValuesOnForm(comunicadoFacultad: ComunicadoFacultad) {
    this.comunicado.setValue(comunicadoFacultad.comunicadoId);
    this.facultad.setValue(comunicadoFacultad.facultadId);
  }

  private buildForm() {
    this.publicarComunicadoForm = this.fb.group({
      comunicado: [''],
      facultad: [''],
    });
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.router.navigate([
      `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/comunicado`,
    ]);
  }

  seleccionarComunicado(trigger: MatAutocompleteTrigger) {
    const dialogRef = this.dialog.open(SeleccionarComunicadoComponent, {
      height: 'auto',
      width: '700px',
    });
    dialogRef.afterOpened().subscribe(() => trigger.closePanel());
    dialogRef
      .afterClosed()
      .subscribe((comunicado) => this.comunicado.setValue(comunicado));
  }

  seleccionarFacultad(autocomplete: MatAutocomplete) {
    console.log(autocomplete);
    const dialogRef = this.dialog.open(SeleccionarFacultadComponent, {
      height: 'auto',
      width: '700px',
    });
    dialogRef
      .afterClosed()
      .subscribe((seccion) => console.log('seccion: ', seccion));
  }

  publicarComunicado(event: Event) {
    event.preventDefault();

    const comunicadoFacultad = new ComunicadoFacultad();
    comunicadoFacultad.comunicadoId = this.comunicado.value.comunicadoId;
    comunicadoFacultad.facultadId = this.facultad.value.facultadId;
    comunicadoFacultad.facultad = this.facultad.value;
    comunicadoFacultad.comunicado = this.comunicado.value;
    console.log('comunicadoFacultad ', comunicadoFacultad);
    this.comunicadoService
      .publicarComunicadoFacultad(comunicadoFacultad)
      .subscribe(() => {
        mensajeConfirmacion(
          'Excelente!',
          `Se publicó comunicado exitosamente.`
        ).then();
        this.router.navigate([
          `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/comunicado`,
        ]);
      });
  }

  
  displayFn(comunicado: Comunicado): string {
    return comunicado && comunicado.nombre ? comunicado.nombre : '';
  }
}
