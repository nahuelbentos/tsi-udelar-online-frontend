import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showSppiner = false;
  constructor(
    private autenticacionService: AutenticacionService,
    public dialogRef: MatDialogRef<HeaderComponent>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('data:', data);

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    this.showSppiner = true;
    this.autenticacionService
      .login(this.email.value, this.password.value)
      .subscribe((res: any) => {
        console.log('res: ', res);

        this.showSppiner = false;

        // if (res.authResponse.LoginEscuela.LoginOk) {
        //   // mensajeConfirmacion(
        //   //   'Excelente!',
        //   //   res.authResponse.LoginEscuela.Mensaje
        //   // );
        //   // localStorage.setItem('usrId', this.email.value);
        //   // localStorage.setItem('infoUsuario', JSON.stringify(res.authResponse));

        //   this.router.navigate(['/escuela/agenda-movil']);
        // } else {
        //   // errorMensaje(
        //   //   'Ocurrió un problema',
        //   //   res.authResponse.LoginEscuela.Mensaje
        //   // );
        // }
      });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
