import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TemplateCurso } from 'src/app/models/template-curso.model';
import { SeleccionarTemplateCursoComponent } from '../../dialogs/seleccionar-template-curso/seleccionar-template-curso.component';

@Component({
  selector: 'app-autocomplete-custom',
  templateUrl: './autocomplete-custom.component.html',
  styleUrls: ['./autocomplete-custom.component.scss'],
})
export class AutocompleteCustomComponent implements OnInit, OnChanges {
  form: FormGroup;

  filteredData: Observable<{}[]>;

  @Input() data: {}[] = [];
  @Input() refDialog: any;
  @Input() label: any;

  @Output() sendItem: EventEmitter<any> = new EventEmitter();

  get controlData() {
    return this.form.get('controlData');
  }

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.buildForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes:: ', changes);
    
    if (changes.data) {
      // this.data = changes.data.currentValue;
      this.setData(changes.data.currentValue);
    }
    console.log('this.data:: ', this.data);
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.fb.group({
      controlData: [''],
    });
  }

  setData(data: {}[]) {
    this.data = data;

    /* Test Autocomplete*/

    this.filteredData = this.controlData.valueChanges.pipe(
      startWith(''),
      map((item) =>
        typeof item === 'string' ? item : item.descripcionAutocomplete
      ),
      map((descripcionAutocomplete) =>
        descripcionAutocomplete
          ? this.filterData(descripcionAutocomplete)
          : this.data.slice()
      )
    );
  }

  private filterData(value: any): {}[] {
    const filterValue = value.toLowerCase();

    return this.data.filter((item: any) =>
      item.descripcionAutocomplete.toLowerCase().includes(filterValue)
    );
  }

  seleccionarItem(trigger: MatAutocompleteTrigger) {
    trigger.closePanel();
    const dialogRef = this.dialog.open(this.refDialog, {
      height: 'auto',
      width: '700px',
    });

    dialogRef.afterOpened().subscribe(() => trigger.closePanel());

    dialogRef.afterClosed().subscribe((item: any) => {
      this.controlData.setValue(item);
      this.sendItem.emit( item );
    });
  }

  displayFn(item: any): string {
    return item && item.descripcionAutocomplete
      ? item.descripcionAutocomplete
      : '';
  }
}
