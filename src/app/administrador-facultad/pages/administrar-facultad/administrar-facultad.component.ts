import { Component, OnInit } from '@angular/core';
import { Actions } from 'src/app/models/actions.model';

@Component({
  selector: 'app-administrar-facultad',
  templateUrl: './administrar-facultad.component.html',
  styleUrls: ['./administrar-facultad.component.scss'],
})
export class AdministrarFacultadComponent implements OnInit {
  actionsHeader = [{}];
  actions: Actions[] ;
  constructor() {}

  ngOnInit(): void {
    this.actions = [
      {
        tooltip: `Editar facultad`,
        mode: 'UPD',
        className: 'button-editar',
        tooltipClassName: 'tooltip-blue',
        icon: 'edit',
      },
    ];
  }
}
