import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TipoUsuario } from '../models/tipo-usuario.enum';
import { UsuarioSesion } from '../models/usuario-sesion.model';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  baseUrl = `${environment.baseUrl}/auth`;
  constructor(private http: HttpClient, private router: Router) {}

  login = (email: string, password: string) => this.http.post<UsuarioSesion>(`${this.baseUrl}/login`, { email, password });

  validarToken = (token: string) => this.http.post<boolean>(`${this.baseUrl}/validate-token`, { token });

  setUser = (usuarioSesion: UsuarioSesion)  => localStorage.setItem('usuarioSesion', JSON.stringify(usuarioSesion));

  getUser = (): UsuarioSesion => JSON.parse(localStorage.getItem('usuarioSesion'));

  setToken = (token: string)  => localStorage.setItem('token', token);

  getToken = (): string => localStorage.getItem('token');

  logout = () => this.router.navigate(['/home']).then( () => localStorage.clear());

  getRolSesion = (): string => this.getUser() ? this.getRol() : '';
  
  // tslint:disable-next-line: max-line-length
  private getRol  = (): string => this.getUser().tipo === TipoUsuario.AdministradorFacultad ? 'administrador-facultad' : this.getUser().tipo;

}
