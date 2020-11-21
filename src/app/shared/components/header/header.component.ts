import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private autenticacionService: AutenticacionService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe((usuarioSesion: UsuarioSesion) => {
      if (usuarioSesion) {
        this.autenticacionService.setUser(usuarioSesion);
        this.autenticacionService.setToken(usuarioSesion.token);

        this.router.navigate(['/' + usuarioSesion.tipo.toLowerCase()]);
      }
    });
  }
}
