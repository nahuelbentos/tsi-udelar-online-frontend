
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { confirmacionUsuario } from 'src/app/utils/sweet-alert';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-table-dynamic-custom',
  templateUrl: './table-dynamic-custom.component.html',
  styleUrls: ['./table-dynamic-custom.component.scss'],
})
export class TableDynamicCustomComponent implements OnInit {
  form: FormGroup;
  dataSource: MatTableDataSource<any>;

  // tslint:disable-next-line: no-input-rename
  @Input('columns') displayedColumns: string[];
  @Input() tipoPlural: string;
  @Input() tipoSingular: string;
  @Input() dataInput: {}[] = [];

  @Input() dataOutput: any[] = [];

  @Output() setDataOutput: EventEmitter<any> = new EventEmitter();

  verUsuario: boolean;
  filtro: string;

  tooltipEditar: string;
  tooltipEliminar: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private fb: FormBuilder) {}

  private buildForm() {
    const cloneForm: any = {};
    this.displayedColumns.forEach((column) => {
      if (column !== 'actions-abm' && column !== 'confirm-cancel') {
        cloneForm[column] = [''];
      }
    });

    this.form = this.fb.group(cloneForm);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataInput);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.tooltipEditar = `Editar ${this.tipoSingular}`;
    this.tooltipEliminar = `Eliminar ${this.tipoSingular}`;

    this.buildForm();
  }

  abm(mode: string, item: any): void {
    switch (mode) {
      case 'INS':
        this.addRow();
        break;
      case 'UPD':
        this.dataOutput = this.dataOutput.map((i) => {
          if (i.id === item.id) {
            i.isDelete = false;
            i.mode = mode;
          }

          return i;
        });

        // Clono el item para no modificar el mode ni los flags, isDelete, isUpate...
        const clone = this.cloneItem(item);
        clone.id = item.id;
        this.form.patchValue(clone);
        break;

      case 'DLT':
        this.dataOutput = this.dataOutput.map((i) => {
          if (i.id === item.id) {
            i.isDelete = true;
            i.mode = mode;
          }
          return i;
        });
        break;
    }
  }

  addRow(): void {
    /*
      Si existe un Id null quiere decir que el usuario intento agregar dos veces una row
      a la table. Entonces evaluamos que no exista para agregar la info al dataOutput .
      */
    const existe = this.dataOutput.find((i) => i.id === null);
    if (!existe) {
      const item: any = this.cloneItem();
      item.id = null;
      item.isInsert = true;
      item.mode = 'INS';
      item.isDelete = false;

      this.dataOutput.unshift(item);
      const aux = new MatTableDataSource(this.dataOutput);
      this.dataSource = aux;

      this.dataSource.paginator = this.paginator;

      // Limpio los inputs dentro de la tabla.
      this.displayedColumns.forEach((column) => {
        // tslint:disable-next-line: curly
        if (column !== 'actions-abm' && column !== 'confirm-cancel')
          this.form.get(column).setValue(null);
      });
    }
  }

  private cloneItem(item?: any): any {
    // Clono el item para no modificar el mode ni los flags, isDelete, isUpate...
    const newItem: any = {};

    this.displayedColumns.forEach((column) => {
      if (column !== 'actions-abm' && column !== 'confirm-cancel') {
        item ? (newItem[column] = item[column]) : (newItem[column] = null);
      }
    });

    return newItem;
  }

  confirm(confirma: boolean, item?: any): void {
    if (confirma) {
      switch (item.mode) {
        case 'INS':
          this.dataOutput = this.dataOutput.map((i) => {
            if (i.id === null) {
              this.displayedColumns.forEach((column) => {
                if (column !== 'actions-abm' && column !== 'confirm-cancel') {
                  i[column] = this.form.get(column).value;
                  this.form.get(column).setValue(null);
                }
              });

              i.id = uuid();

              i.mode = false;
            }

            return i;
          });
          break;

        case 'UPD':
          this.dataOutput = this.dataOutput.map((i) => {
            if (i.id === item.id) {
              this.displayedColumns.forEach((column) => {
                // tslint:disable-next-line: curly
                if (column !== 'actions-abm' && column !== 'confirm-cancel')
                  i[column] = this.form.get(column).value;
              });

              i.id = item.id;

              i.mode = false;
            }

            return i;
          });
          break;

        case 'DLT':
          confirmacionUsuario(
            'Confirmación de Usuario',
            `Está seguro que desea eliminar la linea seleccionada?`
          ).then((confirm) => {
            if (confirm.isConfirmed) {
              const index = this.dataOutput.indexOf(
                this.dataOutput.find((i) => i.id === item.id)
              );
              if (index > -1) {
                this.dataOutput.splice(index, 1);
              }

              this.setDataOutput.emit(this.dataOutput);
              this.actualizarDataSource();
            }
          });

          break;
      }
    } else {
      switch (item.mode) {
        case 'INS':
          const index = this.dataOutput.indexOf(
            this.dataOutput.find((i) => i.id === item.id)
          );
          if (index > -1) {
            this.dataOutput.splice(index, 1);
          }

          break;
        default:
          this.displayedColumns.forEach((column) => {
            // tslint:disable-next-line: curly
            if (column !== 'actions-abm' && column !== 'confirm-cancel')
              this.form.get(column).setValue(null);
          });

          this.dataOutput = this.dataOutput.map((i) =>
            i.id === item.id ? { ...i, mode: false } : i
          );

          break;
      }
    }

    if (!confirma || item.mode === 'INS' || item.mode === 'UPD') {
      this.actualizarDataSource();
    } else if (item.mode !== 'DLT') {
      this.setDataOutput.emit(this.dataOutput);
    }
  }

  actualizarDataSource(): void {
    this.dataSource = new MatTableDataSource(this.dataOutput);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
