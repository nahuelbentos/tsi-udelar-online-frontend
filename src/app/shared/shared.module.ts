import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoginComponent],
  exports: [HeaderComponent, FooterComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class SharedModule {}
