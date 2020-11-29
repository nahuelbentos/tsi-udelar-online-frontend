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

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  fromEmail = false;

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
    private fb: FormBuilder
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
      this.fromEmail = param.fromEmail;
      if (param.email) {
        this.email.setValue(param.email);
      }
    });
  }

  sendEmail = () =>
    this.autenticacionService
      .mailForgotPassword(this.email.value)
      .subscribe((res) => console.log(res));

  changePassword = () => {
    console.log('change pass');

    this.autenticacionService.forgotPassword({
      email: this.email.value,
      passwordNew: this.password.value,
      passwordConfirm: this.passwordConfirm.value,
    }).subscribe( res => console.log('res:: ', res));
    
  };
}
