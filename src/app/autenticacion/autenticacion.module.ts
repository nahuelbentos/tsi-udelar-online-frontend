import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ RegisterComponent, ForgotPasswordComponent],
  imports: [CommonModule, AutenticacionRoutingModule, MaterialModule],
})
export class AutenticacionModule {}
