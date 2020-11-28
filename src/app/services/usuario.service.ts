import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioRole } from '../models/usuario-role.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  baseUrl = `${environment.baseUrl}/usuario`;

  constructor(private http: HttpClient) {}

  createUsuario = (usuario: Usuario) => this.http.post(this.baseUrl, usuario);

  updateUsuario = (usuario: Usuario) => this.http.put(`${this.baseUrl}/${usuario.email}`, usuario);

  getUsuarios = () => this.http.get<Usuario[]>(this.baseUrl);

  getUsuariosByRol = (rol: string) => this.http.get<Usuario[]>(`${this.baseUrl}/rol/${rol}`);
  
  getUsuariosByTipo = (tipo: string) => this.http.get<Usuario[]>(`${this.baseUrl}/tipo/${tipo}`);
  
  getAlumnosByCurso = (id: string) => this.http.get<Usuario[]>(`${this.baseUrl}/alumno/curso/${id}`);

  getDocentesByCurso = (id: string) => this.http.get<Usuario[]>(`${this.baseUrl}/docente/curso/${id}`);

  getDocentesByFacultad = (id: string) => this.http.get<Usuario[]>(`${this.baseUrl}/docente/facultad/${id}`);

  getUsuarioById = (usuarioId: string) => this.http.get<Usuario>(`${this.baseUrl}/id/${usuarioId}`);

  getUsuarioByEmail = (usuarioEmail: string) => this.http.get<Usuario>(`${this.baseUrl}/email/${usuarioEmail}`);

  deleteUsuario = (usuarioId: string) => this.http.delete(`${this.baseUrl}/${usuarioId}`);

  haveRole = (usuarioRole: UsuarioRole) => this.http.post<boolean>(`${this.baseUrl}/tiene-role`, usuarioRole);


}
