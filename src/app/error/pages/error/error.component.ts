import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = this.auth.getUser();
  link = this.auth.getRolSesion() ? this.auth.getRolSesion() : '/home';

  constructor(public router: Router, private auth: AutenticacionService) {}

  ngOnInit(): void {}

  volver = () => this.router.navigate([`/${this.link.toLowerCase()}`]);
}
