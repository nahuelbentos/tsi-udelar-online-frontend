import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
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
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.autenticacionService
      .login(this.email.value, this.password.value)
      .subscribe((usuarioSesion: UsuarioSesion) => {
        const color = usuarioSesion.facultad.colorCodigo
          ? `#${usuarioSesion.facultad.colorCodigo}`
          : '#00a9f4';
        this.dialogRef.close(usuarioSesion);
      });
  }

  register() {
    this.router.navigate([`home/register`], {
      queryParams: { modo: 'INS' },
      // relativeTo: this.route,
    });
    this.dialogRef.close();
  }

  forgotPassword(){
    this.router.navigate([`home/forgot-password`]);
    this.dialogRef.close();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
