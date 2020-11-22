import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Columna } from 'src/app/models/columna.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { confirmacionUsuario } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-gestion-custom',
  templateUrl: './gestion-custom.component.html',
  styleUrls: ['./gestion-custom.component.scss'],
})
export class GestionCustomComponent implements OnInit, OnChanges {
  dataSource: MatTableDataSource<any>;

  // tslint:disable-next-line: no-input-rename
  @Input('columns') displayedColumns: string[];
  @Input() dataInput: {}[] = [];
  @Input() tipoPlural: string;
  @Input() tipoSingular: string;

  @Output() eliminar: EventEmitter<EliminarRow> = new EventEmitter();
 
  tooltipEditar: string;
  tooltipEliminar: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('columns:: ', this.displayedColumns);
    console.log('dataInput:: ', this.dataInput);
    console.log('tipoPlural:: ', this.tipoPlural);
    console.log('tipoSingular:: ', this.tipoSingular);

    this.dataSource = new MatTableDataSource(this.dataInput);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.tooltipEditar = `Editar ${this.tipoSingular}`;
    this.tooltipEliminar = `Eliminar ${this.tipoSingular}`;
  }

  ngOnChanges(value) {
    console.log('value: ', value);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  abm(modo: string, rowData: any) {
    switch (modo) {
      case 'INS':
      case 'UPD':
        const ruta = `/${this.tipoSingular.toLocaleLowerCase().trim()}/abm-${this.tipoSingular.toLocaleLowerCase().trim()}`;
        console.log(ruta);
        const params: { modo: string; id?: string } = { modo };

        // tslint:disable-next-line: curly
        if (rowData && rowData.id) params.id = rowData.id;

        this.router.navigate([`abm-${this.tipoSingular.toLocaleLowerCase().trim()}`], {
          queryParams: params,
          relativeTo: this.route,
        });

        break;

      case 'DLT':
        confirmacionUsuario(
          'Confirmación de Usuario',
          `Está seguro que desea eliminar el ${this.tipoSingular}?`
        ).then((confirm) => {
          if (confirm.isConfirmed) {
            /*
            Habría que ver como se soluciona esto.
            */
            this.eliminar.emit({ elimino: true, id: rowData.id });
          }
        });

        break;

      default:
        break;
    }
  }
}
