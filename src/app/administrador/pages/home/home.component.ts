import { Component, Input, OnInit } from '@angular/core';
import { Actions } from 'src/app/models/actions.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tipo: string;
  actionsHeader = [{}];
  actions = [{}];
  constructor() {}

  ngOnInit(): void {}
}
