import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Mensaje } from '../models/mensaje.model';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  baseUrl = `${environment.baseUrl}/mensaje`;

  constructor(private http: HttpClient) { }

  createMensaje = (mensaje: Mensaje) => this.http.post(this.baseUrl, mensaje);

  updateMensaje = (mensaje: Mensaje) => this.http.put(`${this.baseUrl}/${mensaje.mensajeId}`, mensaje);

  getMensajes = () => this.http.get<Mensaje[]>(this.baseUrl);

  getMensajeById = (mensajeId: string) => this.http.get<Mensaje>(`${this.baseUrl}/${mensajeId}`);

  deleteMensaje = (mensajeId: string) => this.http.delete(`${this.baseUrl}/${mensajeId}`);
}
