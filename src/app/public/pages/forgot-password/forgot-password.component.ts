import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { MustMatch } from 'src/app/utils/custom-validators';
import jwt_decode from 'jwt-decode';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  fromEmail = false;
  token = null;
  hide = true;
  hideConfirm = true;

  form: FormGroup;

  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {
    this.form = this.fb.group(
      {
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
      },
      {
        validators: [MustMatch('password', 'passwordConfirm')],
      }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      console.log('params:: ', param);

      this.fromEmail = param.fromEmail;
      if(param.token){
        this.token = param.token;
        this.autenticacionService.setToken(this.token);
        console.log('token decoded :: ', jwt_decode(this.token));
        const tokenDecoded: { email: string } = jwt_decode(this.token);

        if (tokenDecoded.email) {
          this.email.setValue(tokenDecoded.email);
        }

      }
    });
  }

  sendEmail = () =>
    this.autenticacionService
      .mailForgotPassword(this.email.value)
      .subscribe((res) =>  this.toast.warning('Por favor, revisa tu casilla de mensajes en tu email.') );

  changePassword = () => {
    this.autenticacionService
      .forgotPassword({
        email: this.email.value,
        passwordNew: this.password.value,
        token: this.token,
      })
      .subscribe((usuarioSesion: UsuarioSesion) => {
        if (usuarioSesion) {
          this.autenticacionService.setUser(usuarioSesion);
          this.autenticacionService.setToken(usuarioSesion.token);
          this.toast.success(
            'Se ha modificado la contraseña correctamente!',
            null,
            {
              timeOut: 3000,
            }
          );
          const tipo =
            usuarioSesion.tipo === TipoUsuario.AdministradorFacultad
              ? 'administrador-facultad'
              : usuarioSesion.tipo;
          this.router.navigate(['/' + tipo.toLowerCase()]);
        }
      });
  };
}
