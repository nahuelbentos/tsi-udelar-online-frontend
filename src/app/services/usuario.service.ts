import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  createUsuario(usuario: Usuario) {
    return this.http.post(`${environment.baseUrl}/usuario`, usuario);
  }
}
