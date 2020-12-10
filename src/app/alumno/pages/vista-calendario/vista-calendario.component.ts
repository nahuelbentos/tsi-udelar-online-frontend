import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-vista-calendario',
  templateUrl: './vista-calendario.component.html',
  styleUrls: ['./vista-calendario.component.scss'],
})
export class VistaCalendarioComponent implements OnInit {
  cursoId: string;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { cursoId: string }
  ) {
    this.cursoId = data.cursoId;
  }

  ngOnInit(): void {}
}
