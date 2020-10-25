import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmacionUsuario } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-gestion-custom',
  templateUrl: './gestion-custom.component.html',
  styleUrls: ['./gestion-custom.component.scss'],
})
export class GestionCustomComponent implements OnInit {
  dataSource: MatTableDataSource<any>;

  // tslint:disable-next-line: no-input-rename
  @Input('columns') displayedColumns: string[];
  @Input() dataInput: {}[] = [];
  @Input() tipoPlural: string;
  @Input() tipoSingular: string;

  verUsuario: boolean;
  filtro: string;

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
        const ruta = `/${this.tipoSingular}/abm-${this.tipoSingular}`;
        console.log(ruta);
        const params: { modo: string; id?: string } = { modo };

        if (rowData && rowData.id) params.id = rowData.id;

        this.router.navigate([`abm-${this.tipoSingular}`], {
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
          }
        });

        break;

      default:
        break;
    }
  }
}
