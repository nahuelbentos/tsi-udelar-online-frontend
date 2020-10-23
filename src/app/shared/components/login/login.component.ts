import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { HeaderComponent } from '../header/header.component';

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
    private snackBar: MatSnackBar,
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
      .subscribe(
        (res: any) => {
          console.log('res: ', res);

          this.showSppiner = false;
        },
        (err) => {
          this.showSppiner = false;
          this.snackBar.open(err.error.errores.mensaje);
          setTimeout(() => this.snackBar.dismiss(), 3000);
        }
      );
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
